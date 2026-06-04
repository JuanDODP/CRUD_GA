import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { finalize } from 'rxjs';
// Obtener todos los gets de Todos los endpoints
@Injectable({ providedIn: 'root' })
export class TestService {
  constructor() { }
  private http = inject(HttpClient);
  // loaders o spinners de carga
  loadingAreas = signal<boolean>(false);
  loadingProyectos = signal<boolean>(false);
  loadingAsignaciones = signal<boolean>(false);
  // =====================================================================
  areas = signal<any[]>([]);
  proyectos = signal<any[]>([]);
  asignaciones = signal<any[]>([]);

  getAreas() {
    this.loadingAreas.set(true);
    this.http.get<any[]>(`${environment.baseUrl}/areas`).pipe(
      finalize(() => {
        this.loadingAreas.set(false);
      })).subscribe({
        next: (resp: any) => {
          console.log("QUE TRAE EL GET DE AREAS", resp);
          this.areas.set(resp.areas);
        },
        error: (err: any) => {
          console.log("ESTE ES EL ERROR DE AREAS", err.response);
        },
        complete: () => {
          console.log("GET DE AREAS COMPLETADO");
        }
      });
  }
}
