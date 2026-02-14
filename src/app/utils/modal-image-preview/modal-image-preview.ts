import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AreasService } from '../../home/pages/services/areas.service';

@Component({
  selector: 'modal-image-preview',
  imports: [],
  templateUrl: './modal-image-preview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalImagePreview {


  imagen=input.required<string>();

}
