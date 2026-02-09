import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Area, AreasReponse } from '../../interface/area.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AreasService {
  // constructor() { }
  areas = signal<Area[]>([])
  private http = inject(HttpClient);

  // editar modal
  update_or_create = signal<number>(0) // 0 para crear, 1 para editar;
  // 1. Creamos el signal para el área a editar
  selectedArea = signal<Area | null>(null);

  //  estado para manejar las operaciones
  isSuccess = signal<boolean>(false) // checking, exist, no-exist;
  // resetear el isSuccess
  resetIsSuccess() {
    this.isSuccess.set(false);
  }
  // estado para manejar errores
  isError = signal<boolean>(false);
  // resetear el isError
  resetIsError() {
    this.isError.set(false);
  }

  // 2. Método para asignar el área
  setAreaForEdit(area: Area) {
    this.selectedArea.set(area);
    this.update_or_create.set(1);
  }

  // 3. Método para limpiar (importante para cuando sea una "Nueva Área")
  clearSelectedArea() {

    this.selectedArea.set(null);
    this.update_or_create.set(0);

  }
  // ===============================================================================
  constructor() {
    this.getAreas()
  }
  getAreas() {
    this.http.get<AreasReponse>(`${environment.baseUrl}/areas`).subscribe({
      next: (resp) => {
        this.areas.set(resp.areas);
      },
      error: (err) => {
      }
    });

  }
  createArea(nombre: string, description: string) {
    this.resetIsSuccess();
    return this.http.post<Area>(`${environment.baseUrl}/areas`, { nombre, description }).subscribe({
      next: (resp) => {
        this.areas.update((areas) => [...areas, resp]);
        this.isSuccess.set(true);
      },
      error: (err) => {
        this.isSuccess.set(false);

      }
    });
  }
  updateArea(id: number, nombre: string, description: string) {

    return this.http.patch<Area>(`${environment.baseUrl}/areas/${id}`, { nombre, description }).subscribe({
      next: (resp) => {
        this.areas.update((areas) => areas.map(area => area.id === id ? resp : area));
        this.isSuccess.set(true);

      },
      error: (err) => {
        this.isSuccess.set(false);
      }
    });
  }
  deleteArea(id: number) {
    return this.http.delete(`${environment.baseUrl}/areas/${id}`).subscribe({
      next: () => {
        this.areas.update((areas) => areas.filter(area => area.id !== id));
        this.isSuccess.set(true);

      },
      error: (err) => {
        this.isSuccess.set(false);
      }
    });
  }
}
