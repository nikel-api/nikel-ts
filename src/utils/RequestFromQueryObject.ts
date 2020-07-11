import QueryObject from "../models/query/QueryObject";

export class RequestFromQueryObject {
    query_object: QueryObject;

    constructor(query: QueryObject) { this.query_object = query }

    public formattedQuery() {
        return []
    }
}