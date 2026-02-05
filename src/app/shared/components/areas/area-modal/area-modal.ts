import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AreasService } from '../../../../home/pages/services/areas.service';

@Component({
  selector: 'app-area-modal',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './area-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaModal {
  fb = inject(FormBuilder);
  hasError = signal(false);
  areasService = inject(AreasService);

  addAreaForm = this.fb.group({
    nombre: [''],
    description: [''],
  });

  onSubmit() {
    if (this.addAreaForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
        console.log('FUNCION FUNCIONANDO')
      }, 2000);
      return;
    }
    const { nombre = '', description = '' } = this.addAreaForm.value;
    this.areasService.createArea(nombre!, description!);
  }
}
