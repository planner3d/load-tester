import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from "primeng/table";
import {TestPlanApiService} from "../../api/test-plan.api.service";

@Component({
  selector: 'app-result-table-modal',
  standalone: true,
    imports: [CommonModule, TableModule],
  templateUrl: './result-table-modal.component.html',
  styleUrls: ['./result-table-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultTableModalComponent implements OnInit {

  protected result: string[][] = [];

  constructor(protected testPlanApiService: TestPlanApiService, private changeDetector: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.testPlanApiService.runTestPlan()
        .subscribe(res => {
          this.result = res;
          this.changeDetector.detectChanges();
        });
  }
}
