import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpSampler} from "../types/http-sampler";
import {SelectedScenarioApiService} from "../api/selected-scenario.api.service";
import {Router} from "@angular/router";
import {FtpSampler} from "../types/ftp-sampler";

export interface SelectedScenario {
  guid: string;
  name: string;
  samplerList: Array<HttpSampler | FtpSampler>;
}

@Injectable()
export class SelectedScenarioDataService {

  public selectedScenario$ = new BehaviorSubject<SelectedScenario | undefined>(undefined);
  constructor(private selectedScenarioApiService: SelectedScenarioApiService, private router: Router) { }

  public loadSelectedScenario(guid: SelectedScenario['guid']): Observable<SelectedScenario | undefined> {
    return this.selectedScenarioApiService.getSelectedScenario(guid)
        .pipe(
            tap(selectedScenario => this.selectedScenario$.next(selectedScenario))
        );
  }
}
