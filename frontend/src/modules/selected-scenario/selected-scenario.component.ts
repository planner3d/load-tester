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
import {Scenario} from "../scenario-list/data-access/scenario-list.data.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AddToListBtnComponent} from "../../shared/add-to-list-btn/add-to-list-btn.component";
import {TEST_PLAN_TYPES, TestPlanElement} from "../../core/types/test-plan";
import {HTTP_METHODS, HttpSampler} from "./types/http-sampler";
import {v4} from "uuid";
import {TreeModule} from "primeng/tree";
import {ScenarioListFacadeService} from "../scenario-list/scenario-list.facade.service";
import {SelectedScenarioFacadeService} from "./facade/selected-scenario.facade.service";
import {ScenarioListComponent} from "../scenario-list/scenario-list.component";

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
      protected selectedScenarioFacade: SelectedScenarioFacadeService,
      protected scenarioListFacade: ScenarioListFacadeService,
      protected editedHttpSamplersDataService: EditedHttpSamplersDataService,
      private route: ActivatedRoute,
  ) {}

    private subOnSelectedScenarioReassign(): void {
        this.selectedScenarioFacade.selectedScenario$
            .pipe(
                filter(selectedScenario => !selectedScenario),
                switchMap(() => this.scenarioListFacade.loadScenarioList()),
                withLatestFrom(this.route.params),
                filter(([list, params]) => params['id']),
                map(([scenarioList, params]) => scenarioList.find(scenario => scenario.guid === params['id'])),
                first(),
            )
            .subscribe(selectedScenario => {
                this.selectedScenarioFacade.setSelectedScenario(selectedScenario);
            });
    }

    private subOnSelectedScenarioElements(): void {
        this.route.params
            .pipe(
                switchMap(params => this.selectedScenarioFacade.loadScenarioElementList(params['id'])),
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
      this.selectedScenarioFacade.addScenarioElement(guid, httpSampler)
            .subscribe();
    }

    protected saveEditedElements(): void {
        this.selectedScenarioFacade.updateScenarioElements(this.editedHttpSamplersDataService.editedHttpSamplers)
            .subscribe();
    }

  public ngOnInit(): void {
    this.subOnSelectedScenarioReassign();
    this.subOnSelectedScenarioElements();
  }
}
