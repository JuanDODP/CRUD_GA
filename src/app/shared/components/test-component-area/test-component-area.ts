import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgIf, NgForOf } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-test-component-area',
  imports: [DatePipe],
  templateUrl: './test-component-area.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponentArea {
  loadingAreas = input.required<boolean>();
  areas = input.required<any[]>();
}
