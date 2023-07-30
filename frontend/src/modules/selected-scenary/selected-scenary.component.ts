import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SceneryListComponent} from "../test-plan/features/scenery-list/scenery-list.component";

@Component({
  selector: 'app-selected-scenery',
  standalone: true,
    imports: [CommonModule, SceneryListComponent],
  templateUrl: './selected-scenery.component.html',
  styleUrls: ['./selected-scenery.component.scss']
})
export class SelectedSceneryComponent {

}
