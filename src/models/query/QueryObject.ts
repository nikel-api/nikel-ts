import QueryError from './Exceptions';

/** A class to represent all the queries that can be made. */
export default class QueryObject {
    /** Keep track of what user wants to query for,
     * where each attribute can have a different properties (equality, greater than, etc.)
     * Each key will have the following value:
     * {
     *      equality: string[],
     *      inequality: string[],
     *      less_than: (number | string)[],
     *      less_than_equal_to: (number | string)[],
     *      greater_than: (number | string)[],
     *      greater_than_equal_to: (number | string)[],
     *      starts_with: string,
     *      ends_with: string
     * }
     */
    private attributes: any = { };

    /** Keep track of meta-data such as limit,  */
    //private meta: any = { };

    where(query: any) {
        for(const attribute in query) {
            let value = query[attribute];
            let val_type = typeof(value);

            switch (val_type) {
                case 'string':
                case 'number':
                    this._handleAtomicUpdate(attribute, value, "equality", this.attributes);
                    break;
            
                case 'object':
                    this._handleObjectUpdate(attribute, value);
                    break;

                default:
                    throw new QueryError('All values must be either a string, a number, or an object.');
            }
        }
        return this;
    }

    /** For when a single value is assigned to an attribute
     * e.g. Base.where({name: 'some_name'})
     */
    private _handleAtomicUpdate(key: string, val: string | number, update_type: string, parent: any) {
        // console.log('atomic update', key, val, update_type, parent);

        // Two cases: This attribute is already defined, or we need to create space for it
        if(!parent[key]) {
            // Initialize
            this._initializeAttributeValue(parent);
        }
        console.log({parent: parent, key: key, val: val})
        parent[update_type].push(val);

        console.log('new attributes', this.attributes);
    }

    /** For when a more complicated object is assigned to an attribute
     * e.g. Base.where({name: {$ne: 'name_to_avoid'}})
     */
    private _handleObjectUpdate(key: string, val: any) {
        for(const update_type in val) {
            switch (update_type) {
                case '$eq':
                    this._handleAtomicUpdate(update_type, val[update_type], 'equality', val);
                    break;
                case '$ne':
                    break;
                case '$lt':
                    break;
                case '$lte':
                    break;
                case '$gt':
                    break;
                case '$gte':
                    break;
                case '$sw':
                    break;
                case '$ew':
                    break;
                default:
                    // This is some other field that we need to narrow down to
                    this._handleObjectUpdate(update_type, val[update_type]);
            }
        }
        console.log(key, val);
    }

    private _initializeAttributeValue(attribute: any) {
        console.log("creating new attributes for: ", attribute)
        attribute['equality'] = [];
        attribute['inequality'] = [];
        
        attribute['less_than'] = [];
        attribute['less_than_equal_to'] = [];
        attribute['greater_than'] = [];
        attribute['greater_than_equal_to'] = [];

        attribute['starts_with'] = '';
        attribute['ends_with'] = '';
    }
}

function main() {
    let q = new QueryObject();
    q.where({name: 'hi'}).where({name: 'bye'})
}

main();