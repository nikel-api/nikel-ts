import QueryObject from "./query/QueryObject";

export default class Base {
    /** Build out query requirements */
    private query = new QueryObject();

    /** Must override this from Base */
    //private endpoint_callback = () => { throw new Error("Not implemented!") };
    
    /** Standard where query. Can be used to
     * check equality, greater than, less than, etc.
     * @param w_query An object 
     */
    where(w_query: Record<string, string | object>) {
        this.query.where(w_query);
        console.log(w_query);
    }
}