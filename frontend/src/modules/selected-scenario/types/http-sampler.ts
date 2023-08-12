import {Sampler} from "./sampler";

export enum HTTP_METHODS {
    Post = 'POST',
    Get = 'GET',
    Put = 'PUT',
    Patch = 'PATCH'
}

export interface HttpSampler {
    domain?: string | null;
    method?: HTTP_METHODS | null;
    endpoint?: string | null;
    selected?: boolean;
}