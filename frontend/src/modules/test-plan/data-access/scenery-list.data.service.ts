import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {TestPlanApiService} from "../api/test-plan.api.service";

export interface Scenery {
   guid: string;
   title: string;
}

@Injectable()
export class SceneryListDataService {

  public sceneryList$ = new BehaviorSubject<Scenery[]>([]);
  constructor(private testPlanApiService: TestPlanApiService) {

  }

  public setSceneryList(): void {
      this.testPlanApiService.getSceneryList()
          .subscribe(sceneryList => this.sceneryList$.next(sceneryList));
  }


}
