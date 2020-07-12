import QueryObject from "./query/QueryObject";
import {RequestFromQueryObject} from "../utils/RequestFromQueryObject";
import axios, {AxiosInstance} from "axios";

export default class Base {
    /** Build out query requirements */
    private query = new QueryObject();
    private service: AxiosInstance;

    /** Must override this from Base */
    public endpoint = 'OVERRIDE_ME';

    constructor() {
        this.service = axios.create({
            baseURL: 'https://nikel.ml/api/',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    /** Standard where query. Can be used to
     * check equality, greater than, less than, etc.
     * @param query An object
     */
    where(query: Record<string, string | object | number | null>): Base {
        this.query.add_query(query);
        return this;
    }

    /** Set a limit of number of results to return. Defaults to 100.
     * If multiple calls are made, only the last one will be used.
     * @param new_limit The limit to set.
     * @return this instance
     * */
    public limit(new_limit: number): Base {
        this.query.limit(new_limit);
        return this;
    }

    /** Offset the query results. Defaults to 0.
     * If multiple are provided, the last one will be used
     * @param new_offset The offset to use.
     * @return this instance
     * */
    public offset(new_offset: number): Base {
        this.query.offset(new_offset);
        return this;
    }

    /** Get the results. */
    public async get() {
        let request_params = new RequestFromQueryObject(this.query);
        let request_query = request_params.formattedQuery();
        let request_url = `${this.endpoint}?${request_query}`

        let response = await this.service.get(request_url)
        return response.data.response;
    }
}