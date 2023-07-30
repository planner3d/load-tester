export interface HttpSamplerRequest {
    method: string;
    url: string;
}

export interface HttpHeader {
    domain: string;
    method: string;
    endpoint: string;
}

export interface HttpSampler {
    httpHeader: HttpHeader;
    requestBody?: HttpSamplerRequest;
}