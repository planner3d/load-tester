import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, finalize, Observable, tap} from "rxjs";
import {HttpSampler} from "../types/http-sampler";
import {SelectedScenarioApiService} from "../api/selected-scenario.api.service";
import {Scenario} from "../../test-plan/data-access/scenario-list.data.service";
import {TestPlanElement} from "../../../core/types/test-plan";

@Injectable()
export class SelectedScenarioDataService {

  public loading$ = new BehaviorSubject<boolean>(false);
  public selectedScenario$ = new BehaviorSubject<TestPlanElement<Scenario> | undefined>(undefined);
  public scenarioElementList$ = new BehaviorSubject<TestPlanElement<HttpSampler>[]>([]); // temp type

  constructor(private selectedScenarioApiService: SelectedScenarioApiService) { }

  public loadScenarioElementList(guid: TestPlanElement<Scenario>['guid']): Observable<TestPlanElement<HttpSampler>[]> {
    this.loading$.next(true);
    return this.selectedScenarioApiService.getScenarioElementList(guid)
        .pipe(
            tap(scenarioElementList => this.scenarioElementList$.next(scenarioElementList)),
            finalize(() => this.loading$.next(false))
        );
  }

  public addScenarioElement(parentGuid: TestPlanElement<Scenario>['guid'], elementToAdd: TestPlanElement<HttpSampler>): Observable<boolean> {
    return this.selectedScenarioApiService.addScenarioElement(parentGuid, elementToAdd)
        .pipe(
            filter(status => status),
            tap(() => this.scenarioElementList$.next([...this.scenarioElementList$.getValue(), elementToAdd]))
        )
  }
}
