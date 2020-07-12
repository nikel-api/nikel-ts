import {Base} from './Base';

/**
 * ServiceResponse interface
 */
export interface ServiceResponse {
    id: string
    name: string
    alias: string | null
    building_id: string | null
    description: string | null
    campus: string
    address: string | null
    image: string | null
    coordinates: {
        latitude: number
        longitude: number
    }
    tags: string | null
    attributes: string[]
    last_updated: string
}

export class Services extends Base {
    endpoint = 'services';

    constructor() {
        super();
    }

    /**
     * Get an Services array.
     *
     * @return ServiceResponse array
     */
    public get(): Promise<ServiceResponse[]> {
        return this._get();
    }
}