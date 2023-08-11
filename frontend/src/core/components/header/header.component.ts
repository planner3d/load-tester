import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

}
