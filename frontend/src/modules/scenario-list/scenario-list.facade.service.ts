import { Injectable } from '@angular/core';
import {filter, finalize, Observable, tap} from "rxjs";
import {TestPlanElement} from "../../core/types/test-plan";
import {Scenario, ScenarioListDataService} from "./data-access/scenario-list.data.service";
import {ScenarioListApiService} from "./api/scenario-list.api.service";

@Injectable()
export class ScenarioListFacadeService {

  constructor(
      private scenarioListDataService: ScenarioListDataService,
      private scenarioListApiService: ScenarioListApiService,
  ) { }

  public get scenarioList$(): Observable<TestPlanElement<Scenario>[]> {
     return this.scenarioListDataService.scenarioList$;
  }

  public get loading$(): Observable<boolean> {
    return this.scenarioListDataService.loading$;
  }

  public loadScenarioList(): Observable<TestPlanElement<Scenario>[]> {
    this.scenarioListDataService.loading$.next(true);
    return this.scenarioListApiService.getScenarioList()
        .pipe(
            tap(scenarioList => this.scenarioListDataService.setScenarioList(scenarioList)),
            finalize(() => this.scenarioListDataService.loading$.next(false))
        );
  }

  public addToScenarioList(scenario: TestPlanElement<Scenario>): Observable<boolean> {
    return this.scenarioListApiService.addToScenarioList(scenario)
        .pipe(
            filter(status => status),
            tap(() => this.scenarioListDataService.addScenarioListElement(scenario)),
        );
  }
}
