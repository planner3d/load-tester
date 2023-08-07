import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, shareReplay, tap} from "rxjs";
import {TestPlanApiService} from "../api/test-plan.api.service";

export interface Scenario {
   guid: string;
   title: string;
}

@Injectable()
export class ScenarioListDataService {

  private _scenarioList$ = new BehaviorSubject<Scenario[]>([]);
  public scenarioList$ = this._scenarioList$.asObservable()
      .pipe(shareReplay());
  constructor(private testPlanApiService: TestPlanApiService) {

  }

  public getScenarioList(): Observable<Scenario[]> {
      return this.testPlanApiService.getScenarioList()
          .pipe(
              tap(scenarioList => this._scenarioList$.next(scenarioList))
          );
  }


}
