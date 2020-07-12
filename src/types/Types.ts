/**
 * All available query operations
 */
type QueryOps = '$eq' | '$in' | '$ne' | '$lt' | '$lte' | '$gt' | '$gte' | '$sw' | '$ew';

/**
 * QueryFilter type
 */
export type QueryFilter = { [key in QueryOps]?: string | number | boolean };

/**
 * InputQuery type
 */
export type InputQuery = { [key: string]: string | number | boolean | QueryFilter };

/**
 * Query type
 */
export type Query = Array<[string, string]>;
