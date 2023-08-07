import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpSampler} from "../types/http-sampler";
import {SelectedSceneryApiService} from "../api/selected-scenery.api.service";
import {Router} from "@angular/router";
import {FtpSampler} from "../types/ftp-sampler";

export interface SelectedScenery {
  guid: string;
  name: string;
  samplerList: Array<HttpSampler | FtpSampler>;
}

@Injectable()
export class SelectedSceneryDataService {

  public selectedScenery$ = new BehaviorSubject<SelectedScenery | undefined>(undefined);
  constructor(private selectedSceneryApiService: SelectedSceneryApiService, private router: Router) { }

  public loadSelectedScenery(guid: SelectedScenery['guid']): Observable<SelectedScenery | undefined> {
    return this.selectedSceneryApiService.getSelectedScenery(guid)
        .pipe(
            tap(selectedScenery => this.selectedScenery$.next(selectedScenery))
        );
  }
}
