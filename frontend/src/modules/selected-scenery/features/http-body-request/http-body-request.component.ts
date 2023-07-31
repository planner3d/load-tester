import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HTTP_METHODS, HttpSampler} from "../../types/http-sampler";
import {EditedSamplersDataService} from "../../data-access/edited-samplers.data.service";

export interface HttpSamplerRequestForm {
  method: FormControl<HTTP_METHODS | null>;
  url: FormControl<string | null>;
}

export interface HttpMethodOption {
  name: HTTP_METHODS;
}

@Component({
  selector: 'app-http-body-request',
  standalone: true,
  imports: [CommonModule, DropdownModule, ChipsModule, ReactiveFormsModule],
  templateUrl: './http-body-request.component.html',
  styleUrls: ['./http-body-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpBodyRequestComponent implements OnInit {

  @Input()
  public httpSampler?: HttpSampler;

  protected httpSamplerRequestForm = new FormGroup<HttpSamplerRequestForm>({
    method: new FormControl<HTTP_METHODS | null>(null),
    url: new FormControl<string | null>(null),
  });

  protected httpMethods: HttpMethodOption[] = [
    {
      name: HTTP_METHODS.Get,
    },
    {
      name: HTTP_METHODS.Post,
    },
    {
      name: HTTP_METHODS.Put,
    },
    {
      name: HTTP_METHODS.Patch,
    },
  ];

  constructor(private editedSamplersDataService: EditedSamplersDataService) {

  }

  public ngOnInit(): void {
    if (!this.httpSampler || !this.httpSampler.domain || !this.httpSampler.endpoint) return;
    this.httpSamplerRequestForm.setValue({
      method: this.httpSampler?.method ?? null,
      url: this.httpSampler?.domain + this.httpSampler?.endpoint ?? null,
    });

    this.httpSamplerRequestForm.valueChanges
        .subscribe(httpSamplerChanges => {
          const editedHttpSamplers = this.editedSamplersDataService.editedSamplers$.getValue();
          this.editedSamplersDataService.editedSamplers$.next({
            ...editedHttpSamplers,
            [this.httpSampler?.guid!]: {
              guid: this.httpSampler?.guid ?? '',
              method: httpSamplerChanges.method,
              domain: httpSamplerChanges.url?.slice(0, httpSamplerChanges.url?.indexOf('/')),
              endpoint: httpSamplerChanges.url?.slice(httpSamplerChanges.url?.indexOf('/')+1),
            }
          });
          console.log(this.editedSamplersDataService.editedSamplers$.getValue())
        });
  }

}
