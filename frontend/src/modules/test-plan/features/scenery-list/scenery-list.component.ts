import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scenery-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scenery-list.component.html',
  styleUrls: ['./scenery-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneryListComponent {
  
}
