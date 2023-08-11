import { Injectable } from '@angular/core';
import {Scenario} from "../data-access/scenario-list.data.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class TestPlanApiService {

  private tesPlanGuid = 'cb43895e-a2f4-45c2-aea9-55ddb5c212ae';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getScenarioList(): Observable<Scenario[]> {
    return this.http.get<Scenario[]>(`${this.baseUrl}/test-plan/element/children?parentGuid=${this.tesPlanGuid}`);
  }

  public addToScenarioList(scenario: Scenario): Observable<boolean> {
    return new Observable<boolean>(observer => {
      // this.scenarioList.push(scenario);
      observer.next(true);
    })
  }
}
