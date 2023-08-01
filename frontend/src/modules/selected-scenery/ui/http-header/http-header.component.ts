import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpSampler} from "../../types/http-sampler";
import {EditedHttpSamplersDataService} from "../../data-access/edited-http-samplers.data.service";

@Component({
  selector: 'app-http-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-header.component.html',
  styleUrls: ['./http-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpHeaderComponent {

  @Input()
  public httpSampler?: HttpSampler;

  constructor(protected editedHttpSamplersDataService: EditedHttpSamplersDataService) {
  }
}
