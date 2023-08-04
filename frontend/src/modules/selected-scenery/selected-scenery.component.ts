import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SceneryListComponent} from "../test-plan/features/scenery-list/scenery-list.component";
import {HttpHeaderComponent} from "./ui/http-header/http-header.component";
import {HttpBodyComponent} from "./features/http-body/http-body.component";
import {AccordionModule} from "primeng/accordion";
import {EditedHttpSamplersDataService} from "./data-access/edited-http-samplers.data.service";
import {ActivatedRoute, Params} from "@angular/router";
import {SelectedSceneryDataService} from "./data-access/selected-scenery.data.service";
import {SelectedSceneryApiService} from "./api/selected-scenery.api.service";
import {switchMap, tap} from "rxjs";
@Component({
  selector: 'app-selected-scenery',
  standalone: true,
  imports: [CommonModule, SceneryListComponent, HttpHeaderComponent, HttpBodyComponent, AccordionModule],
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
            tap(console.log),
            switchMap(params => this.selectedSceneryDataService.loadSelectedScenery(params['id'])),
        )
        .subscribe({
            error: console.log,
        });
  }

}
