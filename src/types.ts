/**
 * Response interface
 */
export interface Response<T> {
    response: T[]
    status_code: number
    status_message: string
}

/**
 * Course interface
 */
export interface Course {
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

/**
 * Textbook interface
 */
export interface Textbook {
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

/**
 * Exam interface
 */
export interface Exam {
    id: string
    course_id: string
    course_code: string
    campus: string
    date: string
    start: number
    end: number
    duration: number
    sections: {
        lecture_code: string
        split: string
        location: string | null
    }[]
    last_updated: string
}

/**
 * Eval interface
 */
export interface Eval {
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

/**
 * Food interface
 */
export interface Food {
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

/**
 * Service interface
 */
export interface Service {
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

/**
 * Building interface
 */
export interface Building {
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

/**
 * Parking interface
 */
export interface Parking {
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