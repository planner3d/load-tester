import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../core/components/header/header.component";
import {TestPlanComponent} from "../modules/test-plan/test-plan.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, TestPlanComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
