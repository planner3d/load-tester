import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../core/components/header/header.component";
import {SidebarComponent} from "./ui/sidebar/sidebar.component";
import {SceneryListComponent} from "./features/scenery-list/scenery-list.component";
import {SelectedSceneryComponent} from "../selected-scenery/selected-scenery.component";
import {SceneryListDataService} from "./data-access/scenery-list.data.service";
import {TestPlanApiService} from "./api/test-plan.api.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ErrorComponent} from "../../core/components/error/error.component";

@Component({
  selector: 'app-test-plan',
  standalone: true,
    imports: [CommonModule, HeaderComponent, SidebarComponent, SceneryListComponent, SelectedSceneryComponent, RouterOutlet, RouterLink, ErrorComponent],
  providers: [
      SceneryListDataService,
      TestPlanApiService,
  ],
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPlanComponent {

}
