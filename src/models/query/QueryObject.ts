import QueryError, {InvalidQueryError} from './Exceptions';

/** A class to represent all the queries that can be made. */
export default class QueryObject {
    /** Keep track of what user wants to query for,
     * where each attribute can have a different properties ($eq, greater than, etc.)
     * Each key will have the following $properties value:
     * {
     *      $eq: string[],
     *      $ne: string[],
     *      $lt: (number | string)[],
     *      $lte: (number | string)[],
     *      $gt: (number | string)[],
     *      $gte: (number | string)[],
     *      $sw: string,
     *      $ew: string
     * }
     */
    public attributes: any = { };

    /** List of allowed operators */
    public static ALLOWED_SYMBOLS = [
        '$eq', '$ne',
        '$lt', '$lte',
        '$gt', '$gte',
        '$sw', '$ew'
    ]

    /** Keep track of meta-data such as limit,  */
    private meta = { limit: 0, offset: 0 };

    /** Combine new query with existing data.
     * This can target any attribute, no matter how
     * deeply nested.
     * @param query The query to parse
     * @return this instance
     * */
    add_query(query: any): QueryObject {
        for(const attribute in query) {
            let value = query[attribute];
            let val_type = typeof(value);

            switch (val_type) {
                // If value is a simple primitive like string, number, etc. then do an atomic action
                case 'string':
                case 'number':
                case 'boolean':
                    this._handleAtomicUpdate(attribute, value, "$eq", this.attributes);
                    break;

                case 'object':  // Nested objects need to be further broken down
                    this._handleObjectUpdate(attribute, value, this.attributes);
                    break;

                default:
                    throw new QueryError('All values must be either a string, a number, or an object.');
            }
        }
        return this;
    }

    /** Set a limit of number of results to return. Defaults to 100.
     * If multiple calls are made, only the last one will be used.
     * @param new_limit The limit to set.
     * @return this instance
     * */
    limit(new_limit: number) {
        this.meta.limit = new_limit;
    }

    /** Offset the query results. Defaults to 0.
     * If multiple are provided, the last one will be used
     * @param new_offset The offset to use.
     * @return this instance
     * */
    offset(new_offset: number) {
        this.meta.offset = new_offset;
    }

    /** Get an object representing all the Queries made.
     * @return An object with all the queries
     * */
    public getQuery() {
        // Deep clone
        return JSON.parse(JSON.stringify(this.attributes));
    }

    /** Additional attributes that identify this
     * query. E.g. the limit, offset, etc.
     * @return Additional properties for this query
     * */
    public getMeta() {
        return JSON.parse(JSON.stringify(this.meta));
    }

    /** For when a single value is assigned to an attribute
     * e.g. Base.where({name: 'some_name'})
     * @param key The attribute in question
     * @param val The value for this attribute (e.g. a string, number, boolean, etc.)
     * @param update_type The type of update to do to this attribute, e.g. '$eq', '$lt', etc.
     * @param attributes_level A reference to where this object is located in memory, under this.attributes
     */
    private _handleAtomicUpdate(key: string, val: string | number, update_type: string, attributes_level: any) {
        // If the key is a built-in operation such as $eq, throw error
        // Built-in operators must not be used as a key/attribute
        if(QueryObject.ALLOWED_SYMBOLS.includes(key)) { throw new InvalidQueryError(`Cannot use the symbol ${key} as an attribute!`) }

        // Need to ensure it has space and $properties defined for itself
        if(!attributes_level[key]) {
            // Initialize
            attributes_level[key] = { }
            this._initializeAttributeValue(attributes_level[key]);
        }
        else if(!attributes_level[key]['$properties']) {
            this._initializeAttributeValue(attributes_level[key]);
        }

        attributes_level[key]['$properties'][update_type].push(val);
    }

    /** For when a more complicated object is assigned to an attribute
     * e.g. Base.where({name: {$ne: 'name_to_avoid'}})
     */
    private _handleObjectUpdate(key: string, val: any, attribute_level: any) {
        // If we're dealing with a single value
        if(typeof(val) !== 'object' || val == null) {
            // Base Case: We're no longer working with objects
            // Make sure we have allocated room for this attribute, then do atomic update
            if(!attribute_level[key]) { attribute_level[key] = { } }
            this._handleAtomicUpdate(key, val, '$eq', attribute_level);
            return;
        }

        // For each object assigned
        for(const update_type in val) {

            // If the key is an action such as $eq, $gt, etc.
            if(QueryObject.ALLOWED_SYMBOLS.includes(update_type)) {
                this._handleAtomicUpdate(key, val[update_type], update_type, attribute_level);
            }
            else {  // Recursive Step: try again with this field in the object

                // This is a nested field
                if(!attribute_level[key]) {
                    attribute_level[key] = { };

                    this._initializeAttributeValue(attribute_level[key])
                }
                this._handleObjectUpdate(update_type, val[update_type], attribute_level[key]);
            }
        }
    }

    /** Each attribute needs a $properties hash
     * to keep track of the query being built.
     * @param attribute The attribute for which a $properties hash
     * must be initialized
     * */
    private _initializeAttributeValue(attribute: any) {
        attribute['$properties'] = { }
        attribute['$properties']['$eq'] = [];
        attribute['$properties']['$ne'] = [];
        
        attribute['$properties']['$lt'] = [];
        attribute['$properties']['$lte'] = [];
        attribute['$properties']['$gt'] = [];
        attribute['$properties']['$gte'] = [];

        // Although these two are Arrays, they must have length of AT MOST 1
        attribute['$properties']['$sw'] = [];
        attribute['$properties']['$ew'] = [];
    }
}