import {Base} from './Base';

/**
 * TextbookResponse interface
 */
interface TextbookResponse {
    id: string
    isbn: string
    title: string
    edition: number
    author: string
    image: string
    price: number
    url: string
    courses: {
        id: string
        code: string
        requirement: string
        meeting_sections: {
            code: string
            instructors: string[]
        }[]
    }[]
    last_updated: string
}


export class Textbooks extends Base {
    endpoint = 'textbooks';

    constructor() {
        super();
    }


    /**
     * Get an Textbooks array.
     *
     * @return TextbookResponse array
     */
    public get(): Promise<TextbookResponse[]> {
        return this._get();
    }
}