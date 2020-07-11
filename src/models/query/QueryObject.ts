import QueryError from './Exceptions';

/** A class to represent all the queries that can be made. */
export default class QueryObject {
    /** Keep track of what user wants to query for,
     * where each attribute can have a different properties (equality, greater than, etc.)
     * Each key will have the following $properties value:
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
    public attributes: any = { };

    private static SYMBOL_TO_TYPE_MAPPING = {
        '$eq': 'equality',
        '$ne': 'inequality',
        '$lt': 'less_than',
        '$lte': 'less_than_equal_to',
        '$gt': 'greater_than',
        '$gte': 'greater_than_equal_to',
        '$sw': 'starts_with',
        '$ew': 'ends_with'
    }

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
                    this._handleObjectUpdate(attribute, value, this.attributes);
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
    private _handleAtomicUpdate(key: string, val: string | number, update_type: string, attributes_level: any) {
        // console.log('atomic update', key, val, update_type, parent);
        if(val === 'new_layer_2_val') {
            console.log('here')
        }
        // Two cases: This attribute is already defined, or we need to create space for it
        if(!attributes_level[key]) {
            // Initialize
            attributes_level[key] = { }
            this._initializeAttributeValue(attributes_level[key]);
        }
        else if(!attributes_level[key]['$properties']) {
            this._initializeAttributeValue(attributes_level[key]);
        }
       // console.log({parent: parent, key: key, val: val})
        attributes_level[key]['$properties'][update_type].push(val);

    }

    /** For when a more complicated object is assigned to an attribute
     * e.g. Base.where({name: {$ne: 'name_to_avoid'}})
     */
    private _handleObjectUpdate(key: string, val: any, attribute_level: any) {
        if(typeof(val) !== 'object') {
            if(!attribute_level[key]) { attribute_level[key] = { } }
            this._handleAtomicUpdate(key, val, 'equality', attribute_level);
            return;
        }

        for(const update_type in val) {
            let update_types_mapping = QueryObject.SYMBOL_TO_TYPE_MAPPING;

            // @ts-ignore -- Figure out what's happening here lol
            let res = update_types_mapping[update_type] as any;

            if(res) {
                this._handleAtomicUpdate(key, val[update_type], res, attribute_level);
            } else {
                if(!attribute_level[key]) {
                    attribute_level[key] = { };

                    this._initializeAttributeValue(attribute_level[key])
                }
                this._handleObjectUpdate(update_type, val[update_type], attribute_level[key]);
            }
            // switch (update_type) {
            //     case '$eq':
            //         this._handleAtomicUpdate(key, val[update_type], 'equality', attribute_level);
            //         break;
            //     case '$ne':
            //
            //         break;
            //     case '$lt':
            //         break;
            //     case '$lte':
            //         break;
            //     case '$gt':
            //         break;
            //     case '$gte':
            //         break;
            //     case '$sw':
            //         break;
            //     case '$ew':
            //         break;
            //     default:
            //         // This is some other field that we need to narrow down to
            //         this._handleObjectUpdate(update_type, val[update_type], attribute_level[key]);
            // }
        }
        //console.log(key, val);
    }

    private _initializeAttributeValue(attribute: any) {
        console.log("creating new attributes for: ", attribute)
        attribute['$properties'] = { }
        attribute['$properties']['equality'] = [];
        attribute['$properties']['inequality'] = [];
        
        attribute['$properties']['less_than'] = [];
        attribute['$properties']['less_than_equal_to'] = [];
        attribute['$properties']['greater_than'] = [];
        attribute['$properties']['greater_than_equal_to'] = [];

        attribute['$properties']['starts_with'] = '';
        attribute['$properties']['ends_with'] = '';
    }
}

function main() {
    let q = new QueryObject();
    q.where({name: 'hi', more_key: {'$eq': 2}, nested: { layer_1: 'layer_1_val', layer_1_2: 'layer_1_2_val', nested_2: { layer_2: 'layer_2_val' } }}).where({name: {'$eq': 'another hi'}}).where({another_key: 5, more_key: 6})
        .where({nested: {'$eq': 'nested_1_value', nested_2: { '$eq': 'nested_2_value' }}}).where({nested: {nested_2: {layer_2: 'new_layer_2_val'}}})
    console.log('done', JSON.stringify(q.attributes, null, 2))
}

main();