import { Injectable } from '@angular/core';
import {Scenario} from "../data-access/scenario-list.data.service";
import {first, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class TestPlanApiService {

  private tesPlanGuid = 'cb43895e-a2f4-45c2-aea9-55ddb5c212ae';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getScenarioList(): Observable<Scenario[]> {
    return this.http.get<Scenario[]>(`${this.baseUrl}/test-plan/element/children?parentGuid=${this.tesPlanGuid}`)
        .pipe(first());
  }

  public addToScenarioList(scenario: Scenario): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/test-plan/element`, {
      parentGuid: this.tesPlanGuid,
      child: {
        guid: scenario.guid,
        type: "threadGroup",
        data: {
          name: scenario.data.name
        }
      }
    }).pipe(
        first()
    )
  }
}
