export enum HTTP_METHODS {
    Post = 'POST',
    Get = 'GET',
    Put = 'PUT',
    Patch = 'PATCH'
}

export interface HttpSampler {
    domain: string;
    method: HTTP_METHODS;
    endpoint: string;
}