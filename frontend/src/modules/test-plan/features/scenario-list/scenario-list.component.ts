import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Scenario, ScenarioListDataService} from "../../data-access/scenario-list.data.service";
import {AddToListBtnComponent} from "../../../../shared/add-to-list-btn/add-to-list-btn.component";
import {v4 as uuidv4} from 'uuid';
import {SelectedScenarioDataService} from "../../../selected-scenario/data-access/selected-scenario.data.service";
import {TEST_PLAN_TYPES, TestPlanElement} from "../../../../core/types/test-plan";

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
      protected selectedScenarioDataService: SelectedScenarioDataService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      ) {
  }

  public ngOnInit() {
    this.scenarioListDataService.getScenarioList()
        .pipe(
            untilDestroyed(this),
        )
        .subscribe();
  }

  protected onAddToList(): void {
     this.scenarioListDataService.addToScenarioList({ guid: uuidv4(),
         type: TEST_PLAN_TYPES.ThreadGroup,
         data: {
            name: 'Тестовый сценарий'
         }})
         .pipe(
             untilDestroyed(this),
         )
         .subscribe();
  }

  protected selectScenario(selectedScenario: TestPlanElement<Scenario>) {
    this.selectedScenarioDataService.selectedScenario$.next(selectedScenario);
    this.router.navigate(['selected-scenario', selectedScenario.guid], {relativeTo: this.activatedRoute});
  }
}
