import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../core/components/header/header.component";
import {SidebarComponent} from "./ui/sidebar/sidebar.component";
import {SceneryListComponent} from "./features/scenery-list/scenery-list.component";
import {SelectedSceneryComponent} from "../selected-scenery/selected-scenery.component";
import {SceneryListDataService} from "./data-access/scenery-list.data.service";
import {TestPlanApiService} from "./api/test-plan.api.service";
import {ActivatedRoute, ChildActivationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {filter, take} from "rxjs";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Component({
  selector: 'app-test-plan',
  standalone: true,
    imports: [CommonModule, HeaderComponent, SidebarComponent, SceneryListComponent, SelectedSceneryComponent, RouterOutlet, RouterLink],
  providers: [
      SceneryListDataService,
      TestPlanApiService,
  ],
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPlanComponent {
    constructor(private route: ActivatedRoute, private router: Router) {
    }

}
