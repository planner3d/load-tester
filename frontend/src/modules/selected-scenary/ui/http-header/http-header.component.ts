import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpHeader} from "../../selected-scenery.component";

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
  public header?: HttpHeader;
}
