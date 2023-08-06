import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, shareReplay, tap} from "rxjs";
import {TestPlanApiService} from "../api/test-plan.api.service";

export interface Scenery {
   guid: string;
   title: string;
}

@Injectable()
export class SceneryListDataService {

  private _sceneryList$ = new BehaviorSubject<Scenery[]>([]);
  public sceneryList$ = this._sceneryList$.asObservable()
      .pipe(shareReplay());
  constructor(private testPlanApiService: TestPlanApiService) {

  }

  public getSceneryList(): Observable<Scenery[]> {
      return this.testPlanApiService.getSceneryList()
          .pipe(
              tap(sceneryList => this._sceneryList$.next(sceneryList))
          );
  }


}
