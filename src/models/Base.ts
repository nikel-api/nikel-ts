import {QueryHandler} from '../query/QueryHandler';
import type {InputQuery} from '../types/Types';
import axios, {AxiosInstance} from 'axios';
import {ResponseError} from '../query/Exceptions';

export abstract class Base {
    /**
     * Build out query requirements
     */
    private readonly query: QueryHandler;

    /**
     * Must override this from Base
     */
    abstract endpoint: string;

    /**
     * Private AxiosInstance service
     */
    private service: AxiosInstance;

    protected constructor() {
        this.query = new QueryHandler();
        this.service = axios.create({
            baseURL: 'https://nikel.ml/api/',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Standard where query. Can be used to
     * check equality, greater than, less than, etc.
     *
     * @param query     InputQuery object
     * @return          This instance
     */
    public where(query: InputQuery): this {
        this.query.addQuery(query);
        return this;
    }

    /**
     * Set a limit of number of results to return. Defaults to 10.
     * If multiple calls are made, only the last one will be used.
     *
     * @param newLimit  The limit to set
     * @return          This instance
     */
    public limit(newLimit: number): this {
        this.query.limit(newLimit);
        return this;
    }

    /**
     * Offset the query results. Defaults to 0.
     * If multiple are provided, the last one will be used.
     *
     * @param newOffset The offset to use
     * @return          This instance
     */
    public offset(newOffset: number): this {
        this.query.offset(newOffset);
        return this;
    }

    /**
     * Reset query, also sets meta-data to defaults.
     *
     * @return This instance
     */
    public reset(): this {
        this.query.reset();
        return this;
    }

    /**
     * Get the results.
     *
     * @return Generic Promise
     */
    async _get<T>(): Promise<T> {
        let response = await this.service.get(`${this.endpoint}?${this.query.encodeQuery()}`);
        if (response.status != 200) {
            throw new ResponseError(`response error ${response.status}: ${response.data.status_message}`);
        }
        return response.data.response;
    }
}