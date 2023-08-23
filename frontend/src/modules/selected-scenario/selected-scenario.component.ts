import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpHeaderComponent} from "./ui/http-header/http-header.component";
import {HttpBodyComponent} from "./features/http-body/http-body.component";
import {AccordionModule} from "primeng/accordion";
import {EditedHttpSamplersDataService} from "./data-access/edited-http-samplers.data.service";
import {ActivatedRoute} from "@angular/router";
import {filter, first, map, switchMap, withLatestFrom} from "rxjs";
import {DragDropModule} from "primeng/dragdrop";
import {ErrorComponent} from "../../core/components/error/error.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ScenarioListComponent} from "../test-plan/features/scenario-list/scenario-list.component";
import {SelectedScenarioDataService} from "./data-access/selected-scenario.data.service";
import {Scenario, ScenarioListDataService} from "../test-plan/data-access/scenario-list.data.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AddToListBtnComponent} from "../../shared/add-to-list-btn/add-to-list-btn.component";
import {TEST_PLAN_TYPES, TestPlanElement} from "../../core/types/test-plan";
import {HTTP_METHODS, HttpSampler} from "./types/http-sampler";
import {v4} from "uuid";
import {TreeModule} from "primeng/tree";
import {ScenarioListFacadeService} from "../test-plan/facade/scenario-list.facade.service";

@UntilDestroy()
@Component({
  selector: 'app-selected-scenario',
  standalone: true,
    imports: [CommonModule, ScenarioListComponent, HttpHeaderComponent, HttpBodyComponent, AccordionModule, DragDropModule, ErrorComponent, ProgressSpinnerModule, AddToListBtnComponent, TreeModule],
  providers: [
      EditedHttpSamplersDataService,
  ],
  templateUrl: './selected-scenario.component.html',
  styleUrls: ['./selected-scenario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedScenarioComponent implements OnInit {

  constructor(
      protected selectedScenarioDataService: SelectedScenarioDataService,
      protected scenarioListFacadeService: ScenarioListFacadeService,
      protected editedHttpSamplersDataService: EditedHttpSamplersDataService,
      private route: ActivatedRoute,
  ) {}

    private subOnSelectedScenarioReassign(): void {
        this.selectedScenarioDataService.selectedScenario$
            .pipe(
                filter(selectedScenario => !selectedScenario),
                switchMap(() => this.scenarioListFacadeService.loadScenarioList()),
                withLatestFrom(this.route.params),
                filter(([list, params]) => params['id']),
                map(([scenarioList, params]) => scenarioList.find(scenario => scenario.guid === params['id'])),
                first(),
            )
            .subscribe(selectedScenario => {
                this.selectedScenarioDataService.selectedScenario$.next(selectedScenario)
            });
    }

    private subOnSelectedScenarioElements(): void {
        this.route.params
            .pipe(
                switchMap(params => this.selectedScenarioDataService.loadScenarioElementList(params['id'])),
                untilDestroyed(this),
            )
            .subscribe();
    }

    protected onAddToList(guid: TestPlanElement<Scenario>['guid']): void {
      const httpSampler: TestPlanElement<HttpSampler> = {
          guid: v4(),
          type: TEST_PLAN_TYPES.HttpSampler,
          data: {
              domain: 'www.default.com',
              method: HTTP_METHODS.Get,
              endpoint: '/'
          }
      };
      this.selectedScenarioDataService.addScenarioElement(guid, httpSampler)
            .subscribe();
    }

    protected saveEditedElements(): void {
        const selectedScenario = this.selectedScenarioDataService.selectedScenario$.getValue();
        if (!selectedScenario) return;
        this.selectedScenarioDataService.updateScenarioElements(selectedScenario.guid, this.editedHttpSamplersDataService.editedHttpSamplers)
            .subscribe(() => this.editedHttpSamplersDataService.editedHttpSamplers$.next(undefined));
    }

  public ngOnInit(): void {
    this.subOnSelectedScenarioReassign();
    this.subOnSelectedScenarioElements();
  }
}
