import {QueryError} from './Exceptions';
import type {Query, InputQuery, QueryFilter} from '../types/Types';

export class QueryHandler {
    /**
     * Saved params
     */
    private query: Query = [];

    /**
     * List of allowed operators
     */
    private static SYMBOL_TO_PREFIX_MAPPING: { [key: string]: { [key: string]: string } } = {
        '$eq': {
            'string': '=',
            'number': '=',
            'boolean': '=',
        },
        '$ne': {
            'string': '!',
            'number': '!',
            'boolean': '!',
        },
        '$in': {
            'string': '',
        },
        '$lt': {
            'number': '<',
        },
        '$lte': {
            'number': '<=',
        },
        '$gt': {
            'number': '>',
        },
        '$gte': {
            'number': '>=',
        },
        '$sw': {
            'string': '(',
        },
        '$ew': {
            'string': ')',
        },
        '$sr': {
            'string': '~',
        },
    };

    /**
     * Default meta-data
     */
    private static DEFAULT_META = {limit: 10, offset: 0};

    /**
     * Keep track of meta-data such as limit, etc.
     */
    private meta = QueryHandler.DEFAULT_META;

    /**
     * Combine new query with existing queries.
     *
     * @param query InputQuery object
     * @return      This instance
     */
    addQuery(query: InputQuery): this {
        for (const [queryKey, queryValue] of Object.entries(query)) {
            const queryValueType = typeof queryValue;
            switch (queryValueType) {
                // If only bare number, string or boolean, then push directly to query data
                case 'number':
                case 'boolean':
                case 'string':
                    this.query.push([queryKey, queryValue.toString()]);
                    break;
                // If object, process as Partial<QueryFilter>
                case 'object':
                    const queryFilter = queryValue as Partial<QueryFilter>;
                    // Loop through all filters
                    for (const [queryOp, queryFilterValue] of Object.entries(queryFilter)) {
                        // Check if query operator exists
                        if (queryOp in QueryHandler.SYMBOL_TO_PREFIX_MAPPING) {
                            const queryFilterValueType = typeof queryFilterValue;
                            // Check if query type exists for the appropriate query op
                            if (queryFilterValueType in QueryHandler.SYMBOL_TO_PREFIX_MAPPING[queryOp]) {
                                // Get op and push with filter value to query data
                                const op = QueryHandler.SYMBOL_TO_PREFIX_MAPPING[queryOp][queryFilterValueType];
                                this.query.push([queryKey, op + queryFilterValue!.toString()]);
                            } else {
                                throw new QueryError(
                                    `query operation "${queryOp}" does not support ${queryFilterValueType} type`
                                );
                            }
                        } else {
                            throw new QueryError(`query operation "${queryOp}" not found`);
                        }
                    }
                    break;
                // If something else, throw error
                default:
                    throw new QueryError(`query type "${queryValueType}" not supported`);
            }
        }
        return this;
    }

    /**
     * Set a limit of number of results to return. Defaults to 10.
     * If multiple calls are made, only the last one will be used.
     * The limit can only an integer between 1-100 inclusive.
     *
     * @param newLimit  The limit to set.
     * @return          This instance
     */
    limit(newLimit: number): this {
        if (!Number.isInteger(newLimit) || newLimit < 1 || newLimit > 100) {
            throw new QueryError(`limit ${newLimit} is not an integer in the range 1-100`);
        }
        this.meta.limit = newLimit;
        return this;
    }

    /**
     * Offset the query results. Defaults to 0.
     * If multiple are provided, the last one will be used.
     * The offset can only an integer greater or equal to 1.
     *
     * @param newOffset The offset to use.
     * @return          This instance
     */
    offset(newOffset: number): this {
        if (!Number.isInteger(newOffset) || newOffset < 1) {
            throw new QueryError(`offset is not an integer greater or equal to 1`);
        }
        this.meta.offset = newOffset;
        return this;
    }

    /**
     * Reset query, also sets meta-data to defaults.
     *
     * @return This instance
     */
    reset(): this {
        this.meta = QueryHandler.DEFAULT_META;
        return this;
    }

    /**
     * Encode query
     *
     * @return Encoded query string
     */
    encodeQuery(): string {
        return this.query.map(([key, value]) => `${key}=${value}`).join('&');
    }
}