import { Component, effect, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectosService } from '../../../../home/pages/services/proyectos.service';
import { AreasService } from '../../../../home/pages/services/areas.service';
import { Area } from '../../../../home/interface/area.interface';
import { AlertError } from "../../../../utils/alert-error/alert-error";

@Component({
  selector: 'app-proyecto-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertError],
  templateUrl: './add-proyecto-modal.html',
})
export class ProyectoModalComponent {
  @ViewChild('modalCheckbox') modalCheckbox!: ElementRef<HTMLInputElement>;

  public isOpen = false;
  fb = inject(FormBuilder);
  hasError = signal(false);
  proyectosService = inject(ProyectosService);
  // requerir las areas para mapearlas en el input de seleccion
  areas = input.required<Area[]>();

  addProyectoForm = this.fb.group({
    nombreProyecto: ['', [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
    idArea: ['', [Validators.required]],
  });
  selectProyecto = this.proyectosService.selectedProyecto;
  updateorCreate = this.proyectosService.update_or_create;

  constructor() {
    //   // El effect detecta cambios en el Signal automáticamente
    effect(() => {
      const proyecto = this.proyectosService.selectedProyecto();
      if (proyecto) {
        this.addProyectoForm.patchValue({
          nombreProyecto: proyecto.nombreProyecto,
          fechaInicio: proyecto.fechaInicio ? new Date(proyecto.fechaInicio).toISOString().split('T')[0] : null,
          fechaFin: proyecto.fechaFin ? new Date(proyecto.fechaFin).toISOString().split('T')[0] : null,
          idArea: proyecto.area?.id.toString() // Ajusta según el nombre real en tu interfaz
        });
      } else {
        this.addProyectoForm.reset();
      }
    });
  }
  closeModal() {
    this.modalCheckbox.nativeElement.checked = false;
  }
  onSubmit() {
    if (this.updateorCreate() === 0) {

      if (this.addProyectoForm.invalid) {
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
        return;
      }
      const { nombreProyecto = '', fechaInicio = '', fechaFin = '', idArea = 0 } = this.addProyectoForm.value;
      this.proyectosService.createProyecto(nombreProyecto!, fechaInicio!, fechaFin!, Number(idArea!));
      this.closeModal();
      this.addProyectoForm.reset();
      setTimeout(() => {
        this.proyectosService.resetIsSuccess();
      }, 2000);
    }
    else {
      if (this.addProyectoForm.invalid) {
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
        return;
      }
      const { nombreProyecto = '', fechaInicio = '', fechaFin = '', idArea = 0 } = this.addProyectoForm.value;
      const id = this.selectProyecto()?.id || 0; // Asegúrate de que el ID esté disponible
      this.proyectosService.updateProyecto(id, nombreProyecto!, fechaInicio!, fechaFin!, Number(idArea!));
      this.closeModal();
      setTimeout(() => {
        this.proyectosService.resetIsSuccess();
      }, 2000);
    }
  }
}
