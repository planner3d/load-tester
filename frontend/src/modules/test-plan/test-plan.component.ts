import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../core/components/header/header.component";
import {SidebarComponent} from "./ui/sidebar/sidebar.component";
import {TestPlanApiService} from "./api/test-plan.api.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ErrorComponent} from "../../core/components/error/error.component";
import {ScenarioListComponent} from "./features/scenario-list/scenario-list.component";
import {SelectedScenarioComponent} from "../selected-scenario/selected-scenario.component";
import {ScenarioListDataService} from "./data-access/scenario-list.data.service";
import {SelectedScenarioDataService} from "../selected-scenario/data-access/selected-scenario.data.service";
import {SelectedScenarioApiService} from "../selected-scenario/api/selected-scenario.api.service";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-test-plan',
  standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
        SidebarComponent,
        ScenarioListComponent,
        SelectedScenarioComponent,
        RouterOutlet,
        RouterLink,
        ErrorComponent
    ],
  providers: [
      ScenarioListDataService,
      SelectedScenarioDataService,
      SelectedScenarioApiService,
      TestPlanApiService,
      DialogService
  ],
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPlanComponent {

}
