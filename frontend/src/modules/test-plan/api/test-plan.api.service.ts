import { Injectable } from '@angular/core';
import {Scenario} from "../data-access/scenario-list.data.service";
import {first, Observable, of} from "rxjs";

@Injectable()
export class TestPlanApiService {

  private scenarioList: Scenario[] = [
    {
      guid: 'fjdjhf743747dh',
      title: 'Тестовый сценарий одын'
    },
    {
      guid: '3434fdsddsdh',
      title: 'Тестовый сценарий два'
    },
    {
      guid: '9999sjkdjksjdqq',
      title: 'Тестовый сценарий тры'
    },
  ];

  constructor() { }

  public getScenarioList(): Observable<Scenario[]> {
    return of(this.scenarioList).pipe(
        first()
    );
  }

  public addToScenarioList(scenario: Scenario): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.scenarioList.push(scenario);
      observer.next(true);
    })
  }
}
