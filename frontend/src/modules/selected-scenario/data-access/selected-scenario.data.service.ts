import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpSampler} from "../types/http-sampler";
import {Scenario} from "../../scenario-list/data-access/scenario-list.data.service";
import {TestPlanElement} from "../../../core/types/test-plan";

@Injectable()
export class SelectedScenarioDataService {

  public loading$ = new BehaviorSubject<boolean>(false);
  private _selectedScenario$ = new BehaviorSubject<TestPlanElement<Scenario> | undefined>(undefined);
  public selectedScenario$ = this._selectedScenario$.asObservable();

  private _scenarioElementList$ = new BehaviorSubject<TestPlanElement<HttpSampler>[]>([]);
  public scenarioElementList$ = this._scenarioElementList$.asObservable();

  public get selectedScenario(): TestPlanElement<Scenario> | undefined {
    return this._selectedScenario$.getValue();
  }

  public setScenarioElementList(scenarioElementList: TestPlanElement<HttpSampler>[]): void {
        this._scenarioElementList$.next(scenarioElementList);
  }

  public setSelectedScenario(selectedScenario: TestPlanElement<Scenario> | undefined): void {
    this._selectedScenario$.next(selectedScenario);
  }

  public addScenarioElement(elementToAdd: TestPlanElement<HttpSampler>): void {
    this._scenarioElementList$.next([...this._scenarioElementList$.getValue(), elementToAdd]);
  }
}
