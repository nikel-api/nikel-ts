import {Base} from './Base';

/**
 * EvalResponse interface
 */
export interface EvalResponse {
    id: string
    name: string
    campus: string
    terms: {
        term: string
        lectures: {
            lecture_code: string
            firstname: string
            lastname: string
            s1: number | null
            s2: number | null
            s3: number | null
            s4: number | null
            s5: number | null
            s6: number | null
            invited: number | null
            responses: number
        }[]
    }[]
    last_updated: string;
}

export class Evals extends Base {
    endpoint = 'evals';

    constructor() {
        super();
    }

    /**
     * Get an Evals array.
     *
     * @return EvalResponse array
     */
    public get(): Promise<EvalResponse[]> {
        return this._get();
    }
}