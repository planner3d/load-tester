import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [HttpClient],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  constructor(private http: HttpClient) {
  }

  protected deleteAll(): void {
    this.http.delete(`${environment.apiUrl}/collection`)
        .subscribe();
  }
}
