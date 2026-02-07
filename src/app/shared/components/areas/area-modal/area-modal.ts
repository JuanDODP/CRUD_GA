import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AreasService } from '../../../../home/pages/services/areas.service';
import { AlertError } from "../../../../utils/alert-error/alert-error";

@Component({
  selector: 'app-area-modal',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, AlertError],
  templateUrl: './area-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaModal {
  @ViewChild('modalCheckbox') modalCheckbox!: ElementRef<HTMLInputElement>;

  fb = inject(FormBuilder);
  hasError = signal(false);
  areasService = inject(AreasService);

  addAreaForm = this.fb.group({
    nombre: ['', [Validators.required]],
    description: ['', [Validators.required]],
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
  closeModal() {
    this.modalCheckbox.nativeElement.checked = false;
  }
  onSubmit() {
    if (this.updateorCreate() === 0) {

      if (this.addAreaForm.invalid) {
        console.log("=======================================")
        console.log('HAY ERROR')
        console.log("=======================================")
        this.hasError.set(true);

        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
        return;
      }
      const { nombre = '', description = '' } = this.addAreaForm.value;
      this.areasService.createArea(nombre!, description!);
      this.closeModal();
      this.addAreaForm.reset();
      setTimeout(() => {
        this.areasService.resetIsSuccess();
      }, 2000);
    }
    else {
      if (this.addAreaForm.invalid) {
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
        return;
      }
      const { nombre = '', description = '' } = this.addAreaForm.value;
      const id = this.selectedArea()?.id || 0; // Asegúrate de que el ID esté disponible
      this.areasService.updateArea(id, nombre!, description!);
      this.closeModal();
      setTimeout(() => {
        this.areasService.resetIsSuccess();
      }, 2000);




    }
  }
}
