import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TestService } from '../services/test.service';
import { TestComponentArea } from "../../../shared/components/test-component-area/test-component-area";
import { TestComponentBtnArea } from "../../../shared/components/test-component-area/test-component-btn-area/test-component-btn-area";

@Component({
  selector: 'app-pagetest',
  imports: [TestComponentArea, TestComponentBtnArea],
  templateUrl: './pagetest.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Pagetest {
  testService = inject(TestService);
  // Cuando demos click aqui mostrara los resultados incluyendo un loader

  onClick(){
    this.testService.getAreas();
  }
  }
