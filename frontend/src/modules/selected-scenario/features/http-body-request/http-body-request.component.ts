import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HTTP_METHODS, HttpSampler} from "../../types/http-sampler";
import {EditedHttpSamplersDataService} from "../../data-access/edited-http-samplers.data.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {TEST_PLAN_TYPES, TestPlanElement} from "../../../../core/types/test-plan";


export interface HttpSamplerRequestForm {
  method: FormControl<HTTP_METHODS | null>;
  url: FormControl<string | null>;
}

export interface HttpMethodOption {
  name: HTTP_METHODS;
}

@UntilDestroy()
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
  public httpSampler?: TestPlanElement<HttpSampler>;

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

  constructor(
      private editedSamplersDataService: EditedHttpSamplersDataService,
  ) {
  }

  private setDefaultValues(): void {
    const domain = this.httpSampler?.data?.domain ?? '';
    const endpoint = this.httpSampler?.data?.endpoint ?? '/';
    this.httpSamplerRequestForm.setValue({
      method: this.httpSampler?.data?.method ?? null,
      url: domain + endpoint,
    }, {emitEvent: false});
  }

  public ngOnInit(): void {
    this.setDefaultValues();

    this.httpSamplerRequestForm.valueChanges
        .pipe(
            untilDestroyed(this),
        )
        .subscribe(httpSamplerChanges => {
          if (!this.httpSampler) return;
          const slashIndex = httpSamplerChanges.url?.indexOf('/') ?? -1;
          this.editedSamplersDataService.patchEditedHttpSamplers({
            [this.httpSampler.guid]: {
              guid: this.httpSampler.guid,
              type: TEST_PLAN_TYPES.HttpSampler,
              data: {
                method: httpSamplerChanges.method,
                domain: slashIndex !== -1 ? httpSamplerChanges.url?.slice(0, slashIndex) :  httpSamplerChanges.url,
                endpoint: slashIndex !== -1 ? httpSamplerChanges.url?.slice(slashIndex) : '/',
              }
            }
          });
      });
  }
}
