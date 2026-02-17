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
  createArea(nombre: string, description: string, imagen: File | null) {
    this.resetIsSuccess();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('description', description);
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post<any>(`${environment.baseUrl}/areas`, formData).subscribe({
      // next: (resp) => {
      //   this.areas.update((areas) => [...areas, resp]);
      //   this.isSuccess.set(true);
      // },
      next: (resp) => {
        // 1. Verificamos que resp sea el objeto Area. Si tu API devuelve {area: Area}, usa resp.area
        const nuevaArea = resp?.area ? resp.area : resp; // Ajusta esto según la estructura de tu respuesta
        this.areas.update((currentAreas) => [...currentAreas, nuevaArea]);

        // 2. Marcamos éxito para que el modal sepa que puede cerrarse
        this.isSuccess.set(true);
        console.log('Área agregada exitosamente:', resp);
      },
      error: (err) => {
        this.isSuccess.set(false);
        this.isError.set(true);
        setTimeout(() => {
          this.resetIsError();
        }, 4000);

      }
    });
  }
  updateArea(id: number, nombre: string, description: string, imagen?: File | null) {

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('description', description);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    return this.http.patch<any>(`${environment.baseUrl}/areas/${id}`, formData).subscribe({
      next: (resp) => {
        this.areas.update((areas) => areas.map(area => area.id === id ? resp?.area : area));
        this.isSuccess.set(true);

      },
      error: (err) => {
        this.isSuccess.set(false);
        this.isError.set(true);
        setTimeout(() => {
          this.resetIsError();
        }, 4000);
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
        this.isError.set(true);
        this.isError.set(true);
        setTimeout(() => {
          this.resetIsError();
        }, 4000);
      }
    });
  }
  // descargar datos por exel

  exportToExcel() {
      this.http.get(`${environment.baseUrl}/areas/export/excel`, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'areas.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

        }
        ,
        error: (err) => {
          this.isError.set(true);
          setTimeout(() => {
            this.resetIsError();
          }, 4000);
        }
      });
  }
}
