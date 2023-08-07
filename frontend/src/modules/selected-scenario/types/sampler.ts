export enum SAMPLER_TYPES {
    Http = 'http',
    Ftp = 'ftp'
}

export interface Sampler {
    guid: string;
    type: SAMPLER_TYPES;
}