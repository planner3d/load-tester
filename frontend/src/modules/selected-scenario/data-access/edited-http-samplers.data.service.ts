import { Injectable } from '@angular/core';
import {HttpSampler} from "../types/http-sampler";
import {BehaviorSubject} from "rxjs";
import {TestPlanElement} from "../../../core/types/test-plan";

export interface EditedHttpSamplers {
    [guid: string]: TestPlanElement<HttpSampler>;
}

@Injectable()
export class EditedHttpSamplersDataService {

  public editedHttpSamplers$ = new BehaviorSubject<Partial<EditedHttpSamplers> | undefined>(undefined);

  public get editedHttpSamplers(): Partial<EditedHttpSamplers> {
      const editedHttpSamplers = this.editedHttpSamplers$.getValue();
      if (!editedHttpSamplers) return {};
      return editedHttpSamplers;
  }

  public patchEditedHttpSamplers(editedHttpSamplers: Partial<EditedHttpSamplers>): void {
      this.editedHttpSamplers$.next({
          ...this.editedHttpSamplers,
          ...editedHttpSamplers,
      });
  }

  constructor() { }
}
