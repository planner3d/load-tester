import { Injectable } from '@angular/core';
import {filter, finalize, Observable, tap} from "rxjs";
import {TestPlanElement} from "../../../core/types/test-plan";
import {Scenario, ScenarioListDataService} from "../data-access/scenario-list.data.service";
import {TestPlanApiService} from "../api/test-plan.api.service";

@Injectable()
export class ScenarioListFacadeService {

  constructor(
      private scenarioListDataService: ScenarioListDataService,
      private testPlanApiService: TestPlanApiService,
  ) { }

  public get scenarioList$(): Observable<TestPlanElement<Scenario>[]> {
     return this.scenarioListDataService.scenarioList$;
  }

  public get loading$(): Observable<boolean> {
    return this.scenarioListDataService.loading$;
  }

  public loadScenarioList(): Observable<TestPlanElement<Scenario>[]> {
    this.scenarioListDataService.loading$.next(true);
    return this.testPlanApiService.getScenarioList()
        .pipe(
            tap(scenarioList => this.scenarioListDataService.setScenarioList(scenarioList)),
            finalize(() => this.scenarioListDataService.loading$.next(false))
        );
  }

  public addToScenarioList(scenario: TestPlanElement<Scenario>): Observable<boolean> {
    return this.testPlanApiService.addToScenarioList(scenario)
        .pipe(
            filter(status => status),
            tap(() => this.scenarioListDataService.addScenarioListElement(scenario)),
        );
  }
}
