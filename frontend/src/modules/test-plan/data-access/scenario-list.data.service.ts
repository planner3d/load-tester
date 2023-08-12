import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, finalize, Observable, shareReplay, Subject, switchMap, tap} from "rxjs";
import {TestPlanApiService} from "../api/test-plan.api.service";
import {TestPlanElement} from "../../../core/types/test-plan";

export interface Scenario {
    name: string;
}

@Injectable()
export class ScenarioListDataService {

    public loading$ = new BehaviorSubject<boolean>(false); // make singleton with interceptor?
  private _scenarioList$ = new BehaviorSubject<TestPlanElement<Scenario>[]>([]);
  public scenarioList$ = this._scenarioList$.asObservable()
      .pipe(shareReplay());
  constructor(private testPlanApiService: TestPlanApiService) {

  }

  public getScenarioList(): Observable<TestPlanElement<Scenario>[]> {
      this.loading$.next(true);
      return this.testPlanApiService.getScenarioList()
          .pipe(
              tap(scenarioList => this._scenarioList$.next(scenarioList)),
              finalize(() => this.loading$.next(false))
          );
  }

  public addToScenarioList(scenario: TestPlanElement<Scenario>): Observable<TestPlanElement<Scenario>[]> {
      return this.testPlanApiService.addToScenarioList(scenario)
          .pipe(
              filter(status => status),
              switchMap(() => this.getScenarioList()),
              tap(scenarioList => this._scenarioList$.next(scenarioList))
          );
  }

}
