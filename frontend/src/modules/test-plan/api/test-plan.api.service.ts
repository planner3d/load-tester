import { Injectable } from '@angular/core';
import {Scenario} from "../data-access/scenario-list.data.service";
import {filter, first, Observable, share, shareReplay} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AddTestPlanChildRequest, TestPlanElement} from "../../../core/types/test-plan";
import {isDefined} from "../../../core/utils/is-defined";

@Injectable()
export class TestPlanApiService {

  private tesPlanGuid = 'cb43895e-a2f4-45c2-aea9-55ddb5c212ae';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getScenarioList(): Observable<TestPlanElement<Scenario>[]> {
    return this.http.get<TestPlanElement<Scenario>[]>(`${this.baseUrl}/test-plan/element/children?parentGuid=${this.tesPlanGuid}`)
        .pipe(first());
  }

  public addToScenarioList(scenario: TestPlanElement<Scenario>): Observable<boolean> {
    const requestBody: AddTestPlanChildRequest<Scenario> = {
      parentGuid: this.tesPlanGuid,
      child: { ...scenario }
    }
    return this.http.post<boolean>(`${this.baseUrl}/test-plan/element`, requestBody).pipe(
        first()
    )
  }

  public runTestPlan(): Observable<string[][]> {
    return this.http.get<string[][]>(`${this.baseUrl}/test-plan/result?testPlanGuid=${this.tesPlanGuid}`)
        .pipe(
            first(),
        );
  }
}
