import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpHeaderComponent} from "./ui/http-header/http-header.component";
import {HttpBodyComponent} from "./features/http-body/http-body.component";
import {AccordionModule} from "primeng/accordion";
import {EditedHttpSamplersDataService} from "./data-access/edited-http-samplers.data.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {DragDropModule} from "primeng/dragdrop";
import {ErrorComponent} from "../../core/components/error/error.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ScenarioListComponent} from "../test-plan/features/scenario-list/scenario-list.component";
import {SelectedScenarioDataService} from "./data-access/selected-scenario.data.service";
import {SelectedScenarioApiService} from "./api/selected-scenario.api.service";

@UntilDestroy()
@Component({
  selector: 'app-selected-scenario',
  standalone: true,
    imports: [CommonModule, ScenarioListComponent, HttpHeaderComponent, HttpBodyComponent, AccordionModule, DragDropModule, ErrorComponent],
  providers: [
      EditedHttpSamplersDataService,
      SelectedScenarioDataService,
      SelectedScenarioApiService
  ],
  templateUrl: './selected-scenario.component.html',
  styleUrls: ['./selected-scenario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedScenarioComponent implements OnInit {

  constructor(
      protected selectedScenarioDataService: SelectedScenarioDataService,
      private route: ActivatedRoute,
  ) {}
  public ngOnInit(): void {
    this.route.params
        .pipe(
            switchMap(params => this.selectedScenarioDataService.loadSelectedScenario(params['id'])),
            untilDestroyed(this),
        )
        .subscribe();
  }

}
