import { Injectable } from '@angular/core';
import {Scenery} from "../data-access/scenery-list.data.service";
import {first, Observable, of} from "rxjs";

@Injectable()
export class TestPlanApiService {

  public getSceneryList(): Observable<Scenery[]> {
    return of([
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
    ]).pipe(
        first()
    );
  }
  constructor() { }
}
