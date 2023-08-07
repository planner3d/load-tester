import { Injectable } from '@angular/core';
import {HttpSampler} from "../types/http-sampler";
import {BehaviorSubject} from "rxjs";

export interface EditedHttpSamplers {
    [guid: string]: HttpSampler;
}

@Injectable()
export class EditedHttpSamplersDataService {

  public editedHttpSamplers$ = new BehaviorSubject<Partial<EditedHttpSamplers>>({});

  public get editedHttpSamplers(): Partial<EditedHttpSamplers> {
      return this.editedHttpSamplers$.getValue();
  }

  public patchEditedHttpSamplers(editedHttpSamplers: Partial<EditedHttpSamplers>): void {
      this.editedHttpSamplers$.next({
          ...this.editedHttpSamplers,
          ...editedHttpSamplers,
      });
  }

  constructor() { }
}
