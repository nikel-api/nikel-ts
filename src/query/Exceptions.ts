/**
 * QueryError class
 */
export class QueryError extends Error {
    constructor(message: string) {
        super(message);
    }
}

/**
 * ResponseError class
 */
export class ResponseError extends Error {
    constructor(message: string) {
        super(message);
    }
}