import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-add-to-list-btn',
  standalone: true,
    imports: [CommonModule, ButtonModule],
  templateUrl: './add-to-list-btn.component.html',
  styleUrls: ['./add-to-list-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToListBtnComponent {
  @Output()
  public addToList = new EventEmitter<void>();

  protected onAddBtnClick(): void {
    this.addToList.emit();
  }
}
