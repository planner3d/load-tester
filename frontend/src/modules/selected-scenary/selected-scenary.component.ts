import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScenaryListComponent} from "../test-plan/features/scenary-list/scenary-list.component";
import {ExpansionPanelComponent} from "../../shared/expansion-panel/expansion-panel.component";

@Component({
  selector: 'app-selected-scenary',
  standalone: true,
  imports: [CommonModule, ScenaryListComponent, ExpansionPanelComponent],
  templateUrl: './selected-scenary.component.html',
  styleUrls: ['./selected-scenary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedScenaryComponent {

}
