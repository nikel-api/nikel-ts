import {Base} from './Base';

/**
 * ProgramResponse interface
 */
interface ProgramResponse {
    id: string
    name: string
    type: string
    campus: string
    description: string | null
    enrollment: string | null
    completion: string
    last_updated: string
}

export class Programs extends Base {
    endpoint = 'programs';

    constructor() {
        super();
    }

    /**
     * Get a Programs array.
     *
     * @return ProgramResponse array
     */
    public get(): Promise<ProgramResponse[]> {
        return this._get();
    }
}