import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorComponent} from "../../../../core/components/error/error.component";
import {ScenarioListDataService} from "../../data-access/scenario-list.data.service";

@Component({
  selector: 'app-nothing-selected',
  standalone: true,
    imports: [CommonModule, ErrorComponent],
  templateUrl: './nothing-selected.component.html',
  styleUrls: ['./nothing-selected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NothingSelectedComponent {
  constructor(protected scenarioListDataService: ScenarioListDataService) {
  }
}
