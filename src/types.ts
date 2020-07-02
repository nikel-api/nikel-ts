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
    code: string
    name: string
    description: string
    division: string
    department: string
    prerequisites: string
    corequisites: string
    exclusions: string
    recommended_preparation: string
    level: string
    campus: string
    term: string
    arts_and_science_breadth: string
    arts_and_science_distribution: string
    utm_distribution: string
    utsc_breadth: string
    apsc_electives: string
    meeting_sections: {
        code: string
        instructors: string[]
        times: {
            day: string
            start: number
            end: number
            duration: number
            location: string
        }[]
        size: number
        enrollment: number
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
        location: string
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
            s1: number
            s2: number
            s3: number
            s4: number
            s5: number
            s6: number
            invited: number
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
    description: string
    tags: string
    campus: string
    address: string
    coordinates: {
        latitude: number
        longitude: number
    }
    hours: {
        sunday: {
            closed: boolean
            open: number
            close: number
        }
        monday: {
            closed: boolean
            open: number
            close: number
        }
        tuesday: {
            closed: boolean
            open: number
            close: number
        }
        wednesday: {
            closed: boolean
            open: number
            close: number
        }
        thursday: {
            closed: boolean
            open: number
            close: number
        }
        friday: {
            closed: boolean
            open: number
            close: number
        }
        saturday: {
            closed: boolean
            open: number
            close: number
        }
    }
    image: string
    url: string
    twitter: string
    facebook: string
    attributes: string[]
    last_updated: string
}

/**
 * Service interface
 */
export interface Service {
    id: string
    name: string
    alias: string
    building_id: string
    description: string
    campus: string
    address: string
    image: string
    coordinates: {
        latitude: number
        longitude: number
    }
    tags: string
    attributes: string[]
    last_updated: string
}

/**
 * Building interface
 */
export interface Building {
    id: string
    code: string
    tags: string
    name: string
    short_name: string
    address: {
        street: string
        city: string
        province: string
        country: string
        postal: string
    }
    coordinates: {
        latitude: number
        longitude: number
    }
    last_updated: string
}

/**
 * Parking interface
 */
export interface Parking {
    id: string
    name: string
    alias: string
    building_id: string
    description: string
    campus: string
    address: string
    coordinates: {
        latitude: number
        longitude: number
    }
    last_updated: string
}