import { Injectable } from '@angular/core';
import {first, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({providedIn:'root'})
export class TestPlanApiService {

  private tesPlanGuid = 'cb43895e-a2f4-45c2-aea9-55ddb5c212ae';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public runTestPlan(): Observable<string[][]> {
    return this.http.get<string[][]>(`${this.baseUrl}/test-plan/result?testPlanGuid=${this.tesPlanGuid}`)
        .pipe(
            first(),
        );
  }
}
