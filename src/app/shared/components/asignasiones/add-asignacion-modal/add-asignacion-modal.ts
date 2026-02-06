import { Component, effect, inject, input } from '@angular/core';
import { Area } from '../../../../home/interface/asignaciones.interface';
import { Usuario } from '../../../../auth/interface/user.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsignacionesService } from '../../../../home/pages/services/asignaciones.service';
import { Proyecto } from '../../../../home/interface/proyectos.interface';

@Component({
  selector: 'app-add-asignacion-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-asignacion-modal.html',
})
export class AddAsignacionModal {
  areas = input.required<Area[]>();
  proyectos = input.required<Proyecto[]>();
  usuarios = input.required<Usuario[]>();
  // inyectar el servicio
  asignacionesService = inject(AsignacionesService);
  // ================================================
  fb = inject(FormBuilder);
  addAsignacion = this.fb.group({
    fechaAsignacion: ['', [Validators.required]],
    idUser: ['', [Validators.required]],
    idArea: ['', [Validators.required]],
  });
  selectAsignacion = this.asignacionesService.selectedAsignacion;
  updateorcreate = this.asignacionesService.update_or_create;

  constructor() {
    // efecto para detectar cambios en el signal automáticamente
    effect(() => {

      const asignacion = this.asignacionesService.selectedAsignacion();
      if (asignacion) {
        this.addAsignacion.patchValue({
          fechaAsignacion: asignacion.fechaAsignacion,
          idUser: asignacion.usuario.id.toString(),
          idArea: asignacion.proyecto.area.id.toString(),
        });
      } else {
        this.addAsignacion.reset();
      }
    });
  }

  onSubmit() {
     if(this.updateorcreate()===0){
   if (this.addAsignacion.invalid) {
         return;
       }
       const { fechaAsignacion = '', idUser = '', idArea = '' } = this.addAsignacion.value;
       this.asignacionesService.crearAsignacion(fechaAsignacion!, Number(idUser!), Number(idArea!));
     } else {
   if (this.addAsignacion.invalid) {
         return;
       }
       const { fechaAsignacion = '', idUser = '', idArea = '' } = this.addAsignacion.value;
       const id = this.selectAsignacion()?.id || 0;
       this.asignacionesService.actualizarAsignacion(id, fechaAsignacion!, Number(idUser!), Number(idArea!));
     }

  }
}
