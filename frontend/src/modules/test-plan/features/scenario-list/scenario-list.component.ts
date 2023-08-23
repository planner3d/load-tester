import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Scenario} from "../../data-access/scenario-list.data.service";
import {AddToListBtnComponent} from "../../../../shared/add-to-list-btn/add-to-list-btn.component";
import {v4 as uuidv4} from 'uuid';
import {TEST_PLAN_TYPES, TestPlanElement} from "../../../../core/types/test-plan";
import {ScenarioListFacadeService} from "../../facade/scenario-list.facade.service";
import {SelectedScenarioFacadeService} from "../../../selected-scenario/facade/selected-scenario.facade.service";

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
      protected scenarioListFacade: ScenarioListFacadeService,
      protected selectedScenarioFacade: SelectedScenarioFacadeService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      ) {
  }

  public ngOnInit() {
    this.scenarioListFacade.loadScenarioList()
        .pipe(
            untilDestroyed(this),
        )
        .subscribe();
  }

  protected onAddToList(): void {
     this.scenarioListFacade.addToScenarioList({ guid: uuidv4(),
         type: TEST_PLAN_TYPES.ThreadGroup,
         data: {
            name: 'Тестовый сценарий'
         }})
         .pipe(
             untilDestroyed(this),
         )
         .subscribe();
  }

  protected selectScenario(selectedScenario: TestPlanElement<Scenario>): void {
    this.selectedScenarioFacade.setSelectedScenario(selectedScenario);
    this.router.navigate(['selected-scenario', selectedScenario.guid], {relativeTo: this.activatedRoute});
  }
}
