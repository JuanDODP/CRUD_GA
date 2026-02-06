import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectosService } from '../../../../home/pages/services/proyectos.service';
import { AreasService } from '../../../../home/pages/services/areas.service';
import { Area } from '../../../../home/interface/area.interface';

@Component({
  selector: 'app-proyecto-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-proyecto-modal.html',
})
export class ProyectoModalComponent {
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
onSubmit() {
  console.log('EJECUTADO')
   if (this.addProyectoForm.invalid) {
     this.hasError.set(true);
     console.log('EL ERROR FUNCIONA', this.addProyectoForm.invalid)
     setTimeout(() => {
       this.hasError.set(false);
     }, 2000);
     return;
   }
  const { nombreProyecto = '', fechaInicio = '', fechaFin = '', idArea = 0 } = this.addProyectoForm.value;
  console.log('Esto es lo que llega del formulario:', {nombreProyecto}, {fechaInicio}, {fechaFin}, {idArea});
   this.proyectosService.createProyecto(nombreProyecto!, fechaInicio!, fechaFin!, Number(idArea!));
}
}
