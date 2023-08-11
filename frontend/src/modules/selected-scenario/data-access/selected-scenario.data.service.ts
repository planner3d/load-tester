import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpSampler} from "../types/http-sampler";
import {SelectedScenarioApiService} from "../api/selected-scenario.api.service";
import {Scenario} from "../../test-plan/data-access/scenario-list.data.service";

@Injectable()
export class SelectedScenarioDataService {

  public selectedScenario$ = new BehaviorSubject<Scenario | undefined>(undefined);
  public scenarioElementList$ = new BehaviorSubject<HttpSampler[]>([]); // temp type

  constructor(private selectedScenarioApiService: SelectedScenarioApiService) { }

  public loadScenarioElementList(guid: Scenario['guid']): Observable<HttpSampler[]> {
    return this.selectedScenarioApiService.getScenarioElementList(guid)
        .pipe(
            tap(scenarioElementList => this.scenarioElementList$.next(scenarioElementList))
        );
  }
}
