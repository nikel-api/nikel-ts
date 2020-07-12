export default class QueryError extends Error {
    constructor(message: string) { super(message) }
}

export class InvalidQueryError extends QueryError {
    constructor(message: string) { super(message); }
}

