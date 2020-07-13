/**
 * QueryFilter interface
 */
export interface QueryFilter {
    '$eq': string | number | boolean
    '$ne': string | number | boolean
    '$in': string
    '$lt': number
    '$lte': number
    '$gt': number
    '$gte': number
    '$sw': string
    '$ew': string
}

/**
 * InputQuery type
 */
export type InputQuery = { [key: string]: string | number | boolean | Partial<QueryFilter> };

/**
 * Query type
 */
export type Query = Array<[string, string]>;
