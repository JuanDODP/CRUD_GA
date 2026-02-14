import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Asignacione, AsignacionesResponse } from '../../interface/asignaciones.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AsignacionesService {
  private http = inject(HttpClient);
  asignaciones = signal<Asignacione[]>([]);
  // editar modal

  update_or_create = signal<number>(0) // 0 para crear, 1 para editar;
  // 1. Creamos el signal para la asignación a editar
  selectedAsignacion = signal<Asignacione | null>(null);


  // Método para asignar la asignación
  setAsignacionForEdit(asignacion: Asignacione) {
    // que llega al formulario para editar
    this.selectedAsignacion.set(asignacion);
    this.update_or_create.set(1);
  }
  clearSelectedAsignacion() {
    this.selectedAsignacion.set(null);
    this.update_or_create.set(0);
  }
   isSuccess = signal<boolean>(false) // checking, exist, no-exist;
  // resetear el isSuccess
  resetIsSuccess() {
    this.isSuccess.set(false);
  }

  setAsignacionForDownload(asignacion: Asignacione) {
    this.selectedAsignacion.set(asignacion);
    this.clearSelectedAsignacion();
  }

  //  ================================================================
  constructor() {
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

  crearAsignacion(
    fechaAsignacion: string,
    idUser: number | string,
    idProyecto: number | string
  ) {
    // Lógica para crear una nueva asignación
    this.http.post<any>(`${environment.baseUrl}/asignaciones`, { fechaAsignacion, idUser, idProyecto }).subscribe({
      next: (resp) => {
        this.asignaciones.update((asignaciones) => [...asignaciones, resp.asignacion]);
        this.isSuccess.set(true);
      },
      error: (err) => {
        this.isSuccess.set(false);
      }
    });
  }

actualizarAsignacion(id: number, fechaAsignacion: string, idUser: number | string, idProyecto: number | string) {
  return this.http.patch<any>(`${environment.baseUrl}/asignaciones/${id}`, { fechaAsignacion, idUser, idProyecto }).subscribe({
    next: (resp) => {
      // Extraemos la asignación actualizada (que ya trae usuario y proyecto cargados)
      const asignacionActualizada = resp?.asignacion || resp;

      this.asignaciones.update((list) =>
        list.map(asig => asig.id === id ? asignacionActualizada : asig)
      );

      // CRUCIAL: Actualiza el signal de selección para que la próxima edición sea correcta
      this.selectedAsignacion.set(asignacionActualizada);
      this.isSuccess.set(true);
    },
    error: (err) => {
      this.isSuccess.set(false);
    }
  });
}
  deleteAsignacion(id: number) {
    // Lógica para eliminar una asignación
    return this.http.delete(`${environment.baseUrl}/asignaciones/${id}`).subscribe({
      next: () => {
        this.asignaciones.update((asignaciones) => asignaciones.filter(asignacion => asignacion.id !== id));
        this.isSuccess.set(true);
      },
      error: (err) => {
        this.isSuccess.set(false);
      }
    });
  }
  // descargar pdf
  exportToPDF(id:number) {
    this.http.get(`${environment.baseUrl}/asignaciones/pdf/${id}`, { responseType: 'blob' }).subscribe((response) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'asignaciones.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
