import {Base} from './Base';

/**
 * CourseResponse interface
 */
interface CourseResponse {
    id: string
    code: string | null
    name: string
    description: string
    division: string
    department: string
    prerequisites: string | null
    corequisites: string | null
    exclusions: string | null
    recommended_preparation: string | null
    level: string
    campus: string
    term: string
    arts_and_science_breadth: string | null
    arts_and_science_distribution: string | null
    utm_distribution: string | null
    utsc_breadth: string | null
    apsc_electives: string | null
    meeting_sections: {
        code: string
        instructors: string[]
        times: {
            day: string
            start: number
            end: number
            duration: number
            location: string | null
        }[]
        size: number
        enrollment: number | null
        waitlist_option: boolean
        delivery: string
    }[]
    last_updated: string
}

export class Courses extends Base {
    endpoint = 'courses';

    constructor() {
        super();
    }

    /**
     * Get a Courses array.
     *
     * @return CoursesResponse array
     */
    public get(): Promise<CourseResponse[]> {
        return this._get();
    }
}