import { Component, inject, input } from '@angular/core';
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

  onSubmit() {
    if (this.addAsignacion.invalid) {
      return;
    }
    const { fechaAsignacion = '', idUser = '', idArea = '' } = this.addAsignacion.value;
    this.asignacionesService.crearAsignacion(fechaAsignacion!, Number(idUser!), Number(idArea!));
  }
}
