import {Base} from './Base';

/**
 * BuildingResponse interface
 */
interface BuildingResponse {
    id: string
    code: string | null
    tags: string | null
    name: string
    short_name: string | null
    address: {
        street: string | null
        city: string | null
        province: string | null
        country: string | null
        postal: string | null
    }
    coordinates: {
        latitude: number | null
        longitude: number | null
    }
    last_updated: string
}


export class Buildings extends Base {
    endpoint = 'buildings';

    constructor() {
        super();
    }

    /**
     * Get an Buildings array.
     *
     * @return BuildingResponse array
     */
    public get(): Promise<BuildingResponse[]> {
        return this._get();
    }
}