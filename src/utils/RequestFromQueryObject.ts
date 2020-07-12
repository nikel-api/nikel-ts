import QueryObject from "../models/query/QueryObject";

export class RequestFromQueryObject {
    query_object: QueryObject;

    public static SYMBOL_TO_URL_MAPPING: any = {
        '$eq': '=',
        '$ne': '!',
        '$lt': '<',
        '$lte': '<=',
        '$gt': '>',
        '$gte': '>=',
        '$sw': '(',
        '$ew': ')'
    }

    constructor(query: QueryObject) { this.query_object = query }

    /** Returns a string containing a query string that
     * can be used directly in a URL
     * @return A query string that can be used in a URL.
     * */
    public formattedQuery() {
        // All the fields that user wants to query
        let root_query = this.query_object.getQuery();

        // All the additional meta data, such as limit & offset
        let meta_query = this.query_object.getMeta();

        let query_uri = this.getUrlFromQuery(root_query)
        let meta_uri = this.getURLFromMetaQuery(meta_query);
        return query_uri + '&' + meta_uri;
    }

    /** Generate a query string to represent meta data
     * @param query The query containing meta data
     * */
    private getURLFromMetaQuery(query: any) {
        let url = '';
        for(const key in query) {
            url += `${key}=${query[key]}&`;
        }
        if(url.endsWith('&')) { url = url.slice(0, -1) }
        return url;
    }


    /** Generate a query string URL
     * from a QueryObject. This does most of the work.
     * @param query The QueryObject to convert.
     * */
    private getUrlFromQuery(query: any) {
        let url_builder = '';

        for(const attribute in query) {
            url_builder += this.getUrlFromAttribute(query[attribute], attribute)
        }
        // Technically don't need to remove trailing &, it just looks nicer that way
        if(url_builder.endsWith('&')) { url_builder = url_builder.slice(0, -1) }
        return encodeURI(url_builder);
    }

    private getUrlFromAttribute(sub_query: any, key: string, parent_key?: string) {
        let url = '';
        let url_key = parent_key ? `${parent_key}.${key}` : key

        for(const attribute in sub_query) {
            if(attribute === '$properties') {
                url += this.getUrlParamsFromPropertiesHash(sub_query[attribute], url_key)
            } else {
                url += this.getUrlFromAttribute(sub_query[attribute], attribute, url_key);
            }
        }
        return url;
    }

    /** Given a properties hash, return a string query
     * that represents it
     * */
    private getUrlParamsFromPropertiesHash(properties: any, url_key: string) {
        let url = '';
        for(const p_key in properties) {
            let property_array = properties[p_key] as Array<string>;
            let operator = RequestFromQueryObject.SYMBOL_TO_URL_MAPPING[p_key];

            property_array.forEach((value) => { url += `${url_key}=${operator}${value}&` })
        }
        return url;
    }
}