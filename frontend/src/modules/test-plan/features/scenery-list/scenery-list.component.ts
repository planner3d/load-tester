import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Scenery, SceneryListDataService} from "../../data-access/scenery-list.data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-scenery-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scenery-list.component.html',
  styleUrls: ['./scenery-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneryListComponent implements OnInit {
  constructor(
      protected sceneryListDataService: SceneryListDataService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      ) {
  }

  public ngOnInit() {
    this.sceneryListDataService.getSceneryList()
        .pipe(
            untilDestroyed(this),
        )
        .subscribe();
  }

  protected selectScenery(scenery: Scenery) {
    this.router.navigate(['selected-scenery', scenery.guid], {relativeTo: this.activatedRoute})
  }
}
