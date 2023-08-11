export enum SAMPLER_TYPES {
    Http = 'httpSampler',
    Ftp = 'ftpSampler'
}

export interface Sampler {
    guid: string;
    type: SAMPLER_TYPES;
}