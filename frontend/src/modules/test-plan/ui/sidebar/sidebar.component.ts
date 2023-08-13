import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {TestPlanApiService} from "../../api/test-plan.api.service";
import {DialogService} from "primeng/dynamicdialog";
import {ResultTableModalComponent} from "../../features/result-table-modal/result-table-modal.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  constructor(
      private testPlanApiService: TestPlanApiService,
      private dialogService: DialogService
  ) {
  }

  protected runTestPlan(): void {
    this.dialogService.open(ResultTableModalComponent, {
      header: 'Result',
    });
  }
}
