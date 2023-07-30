import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../core/components/header/header.component";
import {SidebarComponent} from "./ui/sidebar/sidebar.component";
import {SceneryListComponent} from "./features/scenery-list/scenery-list.component";
import {SelectedSceneryComponent} from "../selected-scenary/selected-scenery.component";

@Component({
  selector: 'app-test-plan',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, SceneryListComponent, SelectedSceneryComponent],
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPlanComponent {

}
