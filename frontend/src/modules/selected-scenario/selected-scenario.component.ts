import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpHeaderComponent} from "./ui/http-header/http-header.component";
import {HttpBodyComponent} from "./features/http-body/http-body.component";
import {AccordionModule} from "primeng/accordion";
import {EditedHttpSamplersDataService} from "./data-access/edited-http-samplers.data.service";
import {ActivatedRoute} from "@angular/router";
import {filter, first, map, switchMap, tap, withLatestFrom} from "rxjs";
import {DragDropModule} from "primeng/dragdrop";
import {ErrorComponent} from "../../core/components/error/error.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ScenarioListComponent} from "../test-plan/features/scenario-list/scenario-list.component";
import {SelectedScenarioDataService} from "./data-access/selected-scenario.data.service";
import {Scenario, ScenarioListDataService} from "../test-plan/data-access/scenario-list.data.service";

@UntilDestroy()
@Component({
  selector: 'app-selected-scenario',
  standalone: true,
    imports: [CommonModule, ScenarioListComponent, HttpHeaderComponent, HttpBodyComponent, AccordionModule, DragDropModule, ErrorComponent],
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
      private scenarioListDataService: ScenarioListDataService,
      private route: ActivatedRoute,
  ) {}

    private subOnSelectedScenarioReassign(): void {
        this.selectedScenarioDataService.selectedScenario$
            .pipe(
                filter(selectedScenario => !selectedScenario),
                switchMap(() => this.scenarioListDataService.getScenarioList()),
                withLatestFrom(this.route.params),
                filter(([list, params]) => params['id']),
                map(([scenarioList, params]) => scenarioList.find((scenario: Scenario) => scenario.guid === params['id'])),
                first(),
            )
            .subscribe(selectedScenario => {
                this.selectedScenarioDataService.selectedScenario$.next(selectedScenario)
            });
    }

    private subOnSelectedScenarioChanges(): void {
        this.route.params
            .pipe(
                switchMap(params => this.selectedScenarioDataService.loadScenarioElementList(params['id'])),
                untilDestroyed(this),
            )
            .subscribe();
    }

  public ngOnInit(): void {
    this.subOnSelectedScenarioReassign();
    this.subOnSelectedScenarioChanges();
  }

}
