import {Base} from './Base';

/**
 * ExamResponse interface
 */
export interface ExamResponse {
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

export class Exams extends Base {
    endpoint = 'exams';

    constructor() {
        super();
    }

    /**
     * Get an Exams array.
     *
     * @return ExamResponse array
     */
    public get(): Promise<ExamResponse[]> {
        return this._get();
    }
}