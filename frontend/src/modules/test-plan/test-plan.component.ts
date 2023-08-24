import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../core/components/header/header.component";
import {SidebarComponent} from "./ui/sidebar/sidebar.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ErrorComponent} from "../../core/components/error/error.component";
import {SelectedScenarioComponent} from "../selected-scenario/selected-scenario.component";
import {ScenarioListDataService} from "../scenario-list/data-access/scenario-list.data.service";
import {SelectedScenarioDataService} from "../selected-scenario/data-access/selected-scenario.data.service";
import {DialogService} from "primeng/dynamicdialog";
import {ScenarioListFacadeService} from "../scenario-list/scenario-list.facade.service";
import {SelectedScenarioFacadeService} from "../selected-scenario/facade/selected-scenario.facade.service";
import {ScenarioListComponent} from "../scenario-list/scenario-list.component";

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
      DialogService,
      ScenarioListFacadeService,
      ScenarioListDataService,
      SelectedScenarioFacadeService,
      SelectedScenarioDataService
  ],
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPlanComponent {

}
