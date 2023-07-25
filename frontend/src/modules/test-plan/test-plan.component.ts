import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../../core/components/header/header.component";
import {SidebarComponent} from "./ui/sidebar/sidebar.component";
import {ScenaryListComponent} from "./features/scenary-list/scenary-list.component";
import {SelectedScenaryComponent} from "../selected-scenary/selected-scenary.component";

@Component({
  selector: 'app-test-plan',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, ScenaryListComponent, SelectedScenaryComponent],
  templateUrl: './test-plan.component.html',
  styleUrls: ['./test-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPlanComponent {

}
