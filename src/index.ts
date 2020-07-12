import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Building, Course, Eval, Exam, Food, Parking, Response, Service, Textbook} from './types';

export * from './types';
export * from './models/Base';
export * from './models/Buildings';
export * from './models/Courses';
export * from './models/Evals';
export * from './models/Exams';
export * from './models/Food';
export * from './models/Parking';
export * from './models/Services';
export * from './models/Textbooks';

/**
 * Nikel class
 */
export class Nikel {
    private service: AxiosInstance;

    /**
     * Initialize Nikel client.
     *
     * @remarks
     * The Nikel client uses an axios instance.
     */
    constructor() {
        this.service = axios.create({
            baseURL: 'https://nikel.ml/api/',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Process path from api path and params.
     *
     * @param path      API base path
     * @param params    Params object
     * @returns         API call path
     *
     * @privateRemarks
     * For internal use.
     */
    processPath(path: string, params: Record<string, string>): string {
        return `${path}?${new URLSearchParams(params).toString()}`;
    }

    /**
     * Get courses.
     *
     * @param params    Params object
     * @returns         Response for courses
     */
    getCourses(params: Record<string, string>): Promise<AxiosResponse<Response<Course>>> {
        return this.service.get(this.processPath('courses', params));
    }

    /**
     * Get textbooks.
     *
     * @param params    Params object
     * @returns         Response for textbooks
     */
    getTextbooks(params: Record<string, string>): Promise<AxiosResponse<Response<Textbook>>> {
        return this.service.get(this.processPath('textbooks', params));
    }

    /**
     * Get exams.
     *
     * @param params    Params object
     * @returns         Response for exams
     */
    getExams(params: Record<string, string>): Promise<AxiosResponse<Response<Exam>>> {
        return this.service.get(this.processPath('exams', params));
    }

    /**
     * Get evals.
     *
     * @param params    Params object
     * @returns         Response for evals
     */
    getEvals(params: Record<string, string>): Promise<AxiosResponse<Response<Eval>>> {
        return this.service.get(this.processPath('evals', params));
    }

    /**
     * Get food.
     *
     * @param params    Params object
     * @returns         Response for food
     */
    getFood(params: Record<string, string>): Promise<AxiosResponse<Response<Food>>> {
        return this.service.get(this.processPath('food', params));
    }

    /**
     * Get services.
     *
     * @param params    Params object
     * @returns         Response for services
     */
    getServices(params: Record<string, string>): Promise<AxiosResponse<Response<Service>>> {
        return this.service.get(this.processPath('services', params));
    }

    /**
     * Get buildings.
     *
     * @param params    Params object
     * @returns         Response for buildings
     */
    getBuildings(params: Record<string, string>): Promise<AxiosResponse<Response<Building>>> {
        return this.service.get(this.processPath('building', params));
    }

    /**
     * Get parking.
     *
     * @param params    Params object
     * @returns         Response for parking
     */
    getParking(params: Record<string, string>): Promise<AxiosResponse<Response<Parking>>> {
        return this.service.get(this.processPath('parking', params));
    }
}