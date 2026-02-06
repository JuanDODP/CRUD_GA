import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Proyecto, ProyectosResponse } from '../../interface/proyectos.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProyectosService {
  // constructor() { }
  private http = inject(HttpClient);
  proyectos = signal<Proyecto[]>([]);

  // Editar modal
    update_or_create= signal<number>(0) // 0 para crear, 1 para editar;
    // 1. Creamos el signal para el proyecto a editar
    selectedProyecto = signal<Proyecto | null>(null);

  // 2. Método para asignar el proyecto
  setProyectoForEdit(proyecto: Proyecto) {
    // que llega
    this.selectedProyecto.set(proyecto);
    this.update_or_create.set(1);
  }

  // 3. Método para limpiar (importante para cuando sea un "Nuevo Proyecto")
  clearSelectedProyecto() {
    this.selectedProyecto.set(null);
    this.update_or_create.set(0);
  }
  // ================================================================================
  constructor() {
    this.getProyectos()
  }

  getProyectos() {
    this.http.get<ProyectosResponse>(`${environment.baseUrl}/proyectos`).subscribe({
      next: (resp) => {
        this.proyectos.set(resp.proyectos);
      },
      error: (err) => {
      }
    });
  }
  createProyecto(
    nombreProyecto: string,
    fechaInicio: string,
    fechaFin: string,
    idArea: number | string,
  ) {
    return this.http.post<Proyecto>(`${environment.baseUrl}/proyectos`, { nombreProyecto, fechaInicio, fechaFin, idArea }).subscribe({
      next: (resp) => {
        this.proyectos.update((proyectos) => [...proyectos, resp]);
      },
      error: (err) => {
      }
    });
  }
  updateProyecto(
    id: number,
    nombreProyecto: string,
    fechaInicio: string,
    fechaFin: string,
    idArea: number | string,
  ) {
    return this.http.patch<Proyecto>(`${environment.baseUrl}/proyectos/${id}`, { nombreProyecto, fechaInicio, fechaFin, idArea }).subscribe({
      next: (resp) => {
        this.proyectos.update((proyectos) => proyectos.map(proyecto => proyecto.id === id ? resp : proyecto));
      },
      error: (err) => {
      }
    });
  }
  deleteProyecto(id: number) {
    return this.http.delete(`${environment.baseUrl}/proyectos/${id}`).subscribe({
      next: () => {
        this.proyectos.update((proyectos) => proyectos.filter(proyecto => proyecto.id !== id));
      },
      error: (err) => {
      }
    });
  }
}
