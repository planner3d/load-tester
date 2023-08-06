import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SceneryListComponent} from "../test-plan/features/scenery-list/scenery-list.component";
import {HttpHeaderComponent} from "./ui/http-header/http-header.component";
import {HttpBodyComponent} from "./features/http-body/http-body.component";
import {AccordionModule} from "primeng/accordion";
import {EditedHttpSamplersDataService} from "./data-access/edited-http-samplers.data.service";
import {ActivatedRoute} from "@angular/router";
import {SelectedSceneryDataService} from "./data-access/selected-scenery.data.service";
import {SelectedSceneryApiService} from "./api/selected-scenery.api.service";
import {switchMap} from "rxjs";
import {DragDropModule} from "primeng/dragdrop";
import {ErrorComponent} from "../../core/components/error/error.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-selected-scenery',
  standalone: true,
    imports: [CommonModule, SceneryListComponent, HttpHeaderComponent, HttpBodyComponent, AccordionModule, DragDropModule, ErrorComponent],
  providers: [
      EditedHttpSamplersDataService,
      SelectedSceneryDataService,
      SelectedSceneryApiService
  ],
  templateUrl: './selected-scenery.component.html',
  styleUrls: ['./selected-scenery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedSceneryComponent implements OnInit {

  constructor(
      protected selectedSceneryDataService: SelectedSceneryDataService,
      private route: ActivatedRoute,
  ) {}
  public ngOnInit(): void {
    this.route.params
        .pipe(
            switchMap(params => this.selectedSceneryDataService.loadSelectedScenery(params['id'])),
            untilDestroyed(this),
        )
        .subscribe(console.log);
  }

}
