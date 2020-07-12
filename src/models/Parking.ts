import {Base} from './Base';

/**
 * ParkingResponse interface
 */
interface ParkingResponse {
    id: string
    name: string
    alias: string | null
    building_id: string | null
    description: string | null
    campus: string
    address: string | null
    coordinates: {
        latitude: number
        longitude: number
    }
    last_updated: string
}

export class Parking extends Base {
    endpoint = 'parking';

    constructor() {
        super();
    }

    /**
     * Get an Parking array.
     *
     * @return ParkingResponse array
     */
    public get(): Promise<ParkingResponse[]> {
        return this._get();
    }
}