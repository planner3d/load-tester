import {Injectable, Optional} from '@angular/core';
import {TestPlanElement, UpdateTestPlanChildRequest} from "../../../core/types/test-plan";
import {Scenario} from "../../test-plan/data-access/scenario-list.data.service";
import {EMPTY, filter, finalize, map, Observable, of, switchMap, tap} from "rxjs";
import {HttpSampler} from "../types/http-sampler";
import {SelectedScenarioDataService} from "../data-access/selected-scenario.data.service";
import {SelectedScenarioApiService} from "../api/selected-scenario.api.service";
import {EditedHttpSamplers, EditedHttpSamplersDataService} from "../data-access/edited-http-samplers.data.service";

@Injectable()
export class SelectedScenarioFacadeService {

  constructor(
      private selectedScenarioDataService: SelectedScenarioDataService,
      private selectedScenarioApiService: SelectedScenarioApiService,
      @Optional()
      private editedHttpSamplersDataService: EditedHttpSamplersDataService,
  ) { }

  public get selectedScenario$(): Observable<TestPlanElement<Scenario> | undefined> {
    return this.selectedScenarioDataService.selectedScenario$;
  }

  public get scenarioElementList$(): Observable<TestPlanElement<HttpSampler>[]> {
    return this.selectedScenarioDataService.scenarioElementList$;
  }

  public get loading$(): Observable<boolean> {
    return this.selectedScenarioDataService.loading$;
  }

  public loadScenarioElementList(guid: TestPlanElement<Scenario>['guid']): Observable<TestPlanElement<HttpSampler>[]> {
    this.selectedScenarioDataService.loading$.next(true);
    return this.selectedScenarioApiService.getScenarioElementList(guid)
        .pipe(
            tap(scenarioElementList => this.selectedScenarioDataService.setScenarioElementList(scenarioElementList)),
            finalize(() => this.selectedScenarioDataService.loading$.next(false))
        );
  }

  public addScenarioElement(parentGuid: TestPlanElement<Scenario>['guid'], elementToAdd: TestPlanElement<HttpSampler>): Observable<boolean> {
    return this.selectedScenarioApiService.addScenarioElement(parentGuid, elementToAdd)
        .pipe(
            filter(status => status),
            tap(() => this.selectedScenarioDataService.addScenarioElement(elementToAdd))
        )
  }

  public updateScenarioElements(editedElements: Partial<EditedHttpSamplers>): Observable<TestPlanElement<HttpSampler>[]> {
    const selectedScenario = this.selectedScenarioDataService.selectedScenario;
    if (!selectedScenario) return EMPTY;
    const parentGuid = selectedScenario.guid;
    return of(editedElements)
        .pipe(
            map(elements => Object.values(elements)),
            map(elements => elements.map((element:any) =>
                ({ ...element,  } as UpdateTestPlanChildRequest<HttpSampler>))),
            switchMap(updatedElements => this.selectedScenarioApiService.updateScenarioElements(updatedElements)),
            filter(status => status),
            switchMap(() => this.selectedScenarioApiService.getScenarioElementList(parentGuid)),
            tap(scenarioElements => this.selectedScenarioDataService.setScenarioElementList(scenarioElements)),
            tap(() => this.editedHttpSamplersDataService.editedHttpSamplers$.next(undefined)),
        )
  }

  public setSelectedScenario(selectedScenario: TestPlanElement<Scenario> | undefined): void {
    this.selectedScenarioDataService.setSelectedScenario(selectedScenario);
  }
}
