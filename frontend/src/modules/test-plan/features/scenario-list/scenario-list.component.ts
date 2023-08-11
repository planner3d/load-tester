import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Scenario, ScenarioListDataService} from "../../data-access/scenario-list.data.service";
import {AddToListBtnComponent} from "../../../../shared/add-to-list-btn/add-to-list-btn.component";
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'app-scenario-list',
  standalone: true,
  imports: [CommonModule, AddToListBtnComponent],
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenarioListComponent implements OnInit {
  constructor(
      protected scenarioListDataService: ScenarioListDataService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      ) {
  }

  public ngOnInit() {
    this.scenarioListDataService.getScenarioList()
        .pipe(
            untilDestroyed(this),
        )
        .subscribe(console.log);
  }

  protected onAddToList(): void {
     this.scenarioListDataService.addToScenarioList({ guid: uuidv4(), title: 'Тестовый сценарий'})
         .pipe(
             untilDestroyed(this),
         )
         .subscribe();
  }

  protected selectScenario(scenario: Scenario) {
    this.router.navigate(['selected-scenario', scenario.guid], {relativeTo: this.activatedRoute})
  }
}
