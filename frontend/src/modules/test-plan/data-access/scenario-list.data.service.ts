import { Injectable } from '@angular/core';
import {BehaviorSubject, shareReplay} from "rxjs";
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

  public setScenarioList(scenarioList: TestPlanElement<Scenario>[]): void {
      this._scenarioList$.next(scenarioList);
  }

  public addScenarioListElement(scenario: TestPlanElement<Scenario>): void {
      this._scenarioList$.next([...this._scenarioList$.getValue(), scenario])
  }

}
