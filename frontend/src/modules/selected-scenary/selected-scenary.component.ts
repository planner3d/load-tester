import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScenaryListComponent} from "../test-plan/features/scenary-list/scenary-list.component";

@Component({
  selector: 'app-selected-scenary',
  standalone: true,
    imports: [CommonModule, ScenaryListComponent],
  templateUrl: './selected-scenary.component.html',
  styleUrls: ['./selected-scenary.component.scss']
})
export class SelectedScenaryComponent {

}
