import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Building, Course, Eval, Exam, Food, Parking, Response, Service, Textbook} from './types';

export class Nikel {
    private service: AxiosInstance;

    constructor() {
        this.service = axios.create({
            baseURL: 'https://nikel.ml/api/',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    processPath(path: string, params: Record<string, string>): string {
        return `${path}?${new URLSearchParams(params).toString()}`;
    }

    getCourses(params: Record<string, string>): Promise<AxiosResponse<Response<Course>>> {
        return this.service.get(this.processPath('courses', params));
    }

    getTextbooks(params: Record<string, string>): Promise<AxiosResponse<Response<Textbook>>> {
        return this.service.get(this.processPath('textbooks', params));
    }

    getExams(params: Record<string, string>): Promise<AxiosResponse<Response<Exam>>> {
        return this.service.get(this.processPath('exams', params));
    }

    getEvals(params: Record<string, string>): Promise<AxiosResponse<Response<Eval>>> {
        return this.service.get(this.processPath('evals', params));
    }

    getFood(params: Record<string, string>): Promise<AxiosResponse<Response<Food>>> {
        return this.service.get(this.processPath('food', params));
    }

    getServices(params: Record<string, string>): Promise<AxiosResponse<Response<Service>>> {
        return this.service.get(this.processPath('services', params));
    }

    getBuildings(params: Record<string, string>): Promise<AxiosResponse<Response<Building>>> {
        return this.service.get(this.processPath('building', params));
    }

    getParking(params: Record<string, string>): Promise<AxiosResponse<Response<Parking>>> {
        return this.service.get(this.processPath('parking', params));
    }
}