import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {HttpSampler} from "../types/http-sampler";
import {SelectedSceneryApiService} from "../api/selected-scenery.api.service";
import {Router} from "@angular/router";

export interface SelectedScenery {
  guid: string;
  sceneryHeader: string;
  samplerList: HttpSampler[];
}

@Injectable()
export class SelectedSceneryDataService {

  public selectedScenery$ = new BehaviorSubject<SelectedScenery | undefined>(undefined);
  constructor(private selectedSceneryApiService: SelectedSceneryApiService, private router: Router) { }

  public loadSelectedScenery(guid: SelectedScenery['guid']): Observable<SelectedScenery> {
    return this.selectedSceneryApiService.getSelectedScenery(guid)
        .pipe(
            tap(selectedScenery => this.selectedScenery$.next(selectedScenery))
        );
  }
}
