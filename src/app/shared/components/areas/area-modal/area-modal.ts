import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
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
  // OBTENER EL AREA SELECCIONADA DESDE EL SERVICE
  selectedArea = this.areasService.selectedArea;
  updateorCreate = this.areasService.update_or_create;

constructor() {
    // El effect detecta cambios en el Signal automáticamente
    effect(() => {
      const area = this.areasService.selectedArea();
      if (area) {
        this.addAreaForm.patchValue({
          nombre: area.nombre,
          description: area.description,
        });
      } else {
        this.addAreaForm.reset();
      }
    });
  }
  onSubmit() {
    if(this.updateorCreate()===0){
        console.log('EJECUTO EL AGREGAR')

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
    else {
      console.log('SE EJECUTO EL EDITAR')
      if (this.addAreaForm.invalid) {
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
          console.log('FUNCION FUNCIONANDO')
        }, 2000);
        return;
      }
      const { nombre = '', description = '' } = this.addAreaForm.value;
      const id = this.selectedArea()?.id || 0; // Asegúrate de que el ID esté disponible
      this.areasService.updateArea(id, nombre!, description!);
    }
  }
}
