import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-test-component-btn-area',
  imports: [],
  templateUrl: './test-component-btn-area.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponentBtnArea {
  getAreas=output<void>();
  titleBtn=input.required<string>();


 }
