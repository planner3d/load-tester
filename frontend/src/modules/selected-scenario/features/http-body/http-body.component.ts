import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {TabViewModule} from "primeng/tabview";
import {HttpBodyRequestComponent} from "../http-body-request/http-body-request.component";
import {HttpSampler} from "../../types/http-sampler";
import {TestPlanElement} from "../../../../core/types/test-plan";

@Component({
  selector: 'app-http-body',
  standalone: true,
  imports: [CommonModule, ButtonModule, TabViewModule, HttpBodyRequestComponent],
  templateUrl: './http-body.component.html',
  styleUrls: ['./http-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpBodyComponent {

  @Input()
  public httpSampler?: TestPlanElement<HttpSampler>;
}
