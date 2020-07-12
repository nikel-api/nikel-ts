import {QueryError} from './Exceptions';
import type {Query, InputQuery, QueryFilter} from '../types/Types';

export class QueryHandler {
    /**
     * Saved params
     */
        // TODO: change this
    public query: Query = [];

    /**
     * List of allowed operators
     */
    private static SYMBOL_TO_PREFIX_MAPPING: { [key: string]: { [key: string]: string | undefined } } = {
        '$eq': {
            'string': '=',
            'number': '=',
            'boolean': '=',
        },
        '$in': {
            'string': '',
        },
        '$ne': {
            'string': '!',
            'number': '!',
            'boolean': '!',
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
    addQuery(query: InputQuery): QueryHandler {
        for (const [queryKey, queryValue] of Object.entries(query)) {
            const queryValueType = typeof queryValue;
            switch (queryValueType) {
                // If only bare number, string or boolean, then push directly to query data
                case 'number':
                case 'boolean':
                case 'string':
                    this.query.push([queryKey, queryValue.toString()]);
                    break;
                // If object, process as QueryFilter
                case 'object':
                    const queryFilter = queryValue as QueryFilter;
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
     *
     * @param newLimit  The limit to set.
     * @return          This instance
     */
    limit(newLimit: number): QueryHandler {
        this.meta.limit = newLimit;
        return this;
    }

    /**
     * Offset the query results. Defaults to 0.
     * If multiple are provided, the last one will be used.
     *
     * @param newOffset The offset to use.
     * @return          This instance
     */
    offset(newOffset: number): QueryHandler {
        this.meta.offset = newOffset;
        return this;
    }

    /**
     * Reset query, also sets meta-data to defaults.
     *
     * @return This instance
     */
    reset(): QueryHandler {
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