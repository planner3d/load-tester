import {Injectable} from '@angular/core';
import {first, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {HttpSampler} from "../types/http-sampler";
import {Scenario} from "../../test-plan/data-access/scenario-list.data.service";

@Injectable()
export class SelectedScenarioApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getScenarioElementList(guid: Scenario['guid']): Observable<HttpSampler[]> {
    return this.http.get<HttpSampler[]>(`${this.baseUrl}/test-plan/element/children?parentGuid=${guid}`)
        .pipe(first());
  }
}
