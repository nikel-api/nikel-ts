import {Base} from './Base';

/**
 * FoodResponse interface
 */
interface FoodResponse {
    id: string
    name: string
    description: string | null
    tags: string | null
    campus: string
    address: string | null
    coordinates: {
        latitude: number
        longitude: number
    }
    hours: {
        sunday: {
            closed: boolean
            open: number | null
            close: number | null
        }
        monday: {
            closed: boolean
            open: number | null
            close: number | null
        }
        tuesday: {
            closed: boolean
            open: number | null
            close: number | null
        }
        wednesday: {
            closed: boolean
            open: number | null
            close: number | null
        }
        thursday: {
            closed: boolean
            open: number | null
            close: number | null
        }
        friday: {
            closed: boolean
            open: number | null
            close: number | null
        }
        saturday: {
            closed: boolean
            open: number | null
            close: number | null
        }
    } | null
    image: string | null
    url: string | null
    twitter: string | null
    facebook: string | null
    attributes: string[]
    last_updated: string
}

export class Food extends Base {
    endpoint = 'food';

    constructor() {
        super();
    }

    /**
     * Get an Food array.
     *
     * @return FoodResponse array
     */
    public get(): Promise<FoodResponse[]> {
        return this._get();
    }
}