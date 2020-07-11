import QueryObject from "./query/QueryObject";
import {RequestFromQueryObject} from "../utils/RequestFromQueryObject";

export default class Base {
    /** Build out query requirements */
    private query = new QueryObject();

    /** Must override this from Base */
    public endpoint_callback = () => { throw new Error("Not implemented!") };
    
    /** Standard where query. Can be used to
     * check equality, greater than, less than, etc.
     * @param query An object
     */
    where(query: Record<string, string | object | number | null>) {
        this.query.add_query(query);
        return this;
    }

    /** Set a limit of number of results to return. Defaults to 100.
     * If multiple calls are made, only the last one will be used.
     * @param new_limit The limit to set.
     * @return this instance
     * */
    public limit(new_limit: number) {
        this.query.limit(new_limit);
        return this;
    }

    /** Offset the query results. Defaults to 0.
     * If multiple are provided, the last one will be used
     * @param new_offset The offset to use.
     * @return this instance
     * */
    public offset(new_offset: number) {
        this.query.offset(new_offset);
        return this;
    }

    /** Get the results. */
    public get() {
        let request_params = new RequestFromQueryObject(this.query.getQuery());
        let request_query = request_params.formattedQuery();

        console.log(request_query)
    }

    json_result() {
        return this.query.attributes;
    }
}

function main(){
    let b = new Base();
    b.where({name: 'hi', more_key: {'$eq': 2}, nested: { layer_1: 'layer_1_val', layer_1_2: { '$lt': 5 }, nested_2: { layer_2: 'layer_2_val' } }}).where({name: {'$eq': 'another hi'}}).where({another_key: {'$gt': 5}, more_key: 6})
        .where({nested: {'$ne': 'nested_1_value', nested_2: { '$eq': 'nested_2_value', layer_2: { '$sw': 'some_prefix' } }}}).where({nested: {nested_2: {layer_2: 'new_layer_2_val_2'}}})
    b.offset(35).limit(50);

    b.get();
    console.log('done', JSON.stringify(b.json_result(), null, 2))
}
main();