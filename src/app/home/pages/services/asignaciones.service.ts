import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Asignacione, AsignacionesResponse } from '../../interface/asignaciones.interface';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AsignacionesService {
  private http = inject(HttpClient);
  asignaciones = signal<Asignacione[]>([]);
  constructor(){
    this.getAsignaciones()
  }
  getAsignaciones() {
    this.http.get<AsignacionesResponse>(`${environment.baseUrl}/asignaciones`)
      .subscribe(response => {
        if (response.ok) {
          this.asignaciones.set(response.asignaciones);
        }
      });
  }

  crearAsignacion(asignacion: any) {
    // Lógica para crear una nueva asignación
  }

  actualizarAsignacion(id: number, cambios: any) {
    // Lógica para actualizar una asignación existente
  }

  eliminarAsignacion(id: number) {
    // Lógica para eliminar una asignación
  }
}
