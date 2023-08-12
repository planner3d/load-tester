import {Injectable} from '@angular/core';
import {first, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {HttpSampler} from "../types/http-sampler";
import {Scenario} from "../../test-plan/data-access/scenario-list.data.service";
import {AddTestPlanChildRequest, TEST_PLAN_TYPES, TestPlanElement} from "../../../core/types/test-plan";
import {v4} from "uuid";

@Injectable()
export class SelectedScenarioApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getScenarioElementList(guid: TestPlanElement<Scenario>['guid']): Observable<TestPlanElement<HttpSampler>[]> {
    return this.http.get<TestPlanElement<HttpSampler>[]>(`${this.baseUrl}/test-plan/element/children?parentGuid=${guid}`)
        .pipe(first());
  }

  public addScenarioElement(parentGuid: TestPlanElement<Scenario>['guid'], elementToAdd: TestPlanElement<HttpSampler>): Observable<boolean> {
    const requestBody: AddTestPlanChildRequest<HttpSampler> = {
      parentGuid,
      child: { ...elementToAdd }
    }
    return this.http.post<boolean>(`${this.baseUrl}/test-plan/element`, requestBody).pipe(
        first()
    )
  }
}
