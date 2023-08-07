import {Sampler} from "./sampler";

export interface FtpSampler extends Sampler {
    destination?: string; // just for fun
}