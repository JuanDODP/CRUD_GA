import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Proyecto, ProyectosResponse } from '../../interface/proyectos.interface';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProyectosService {
  // constructor() { }
private http = inject(HttpClient);
proyectos = signal<Proyecto[]>([]);
constructor(){
  this.getProyectos()}

  getProyectos (){
  this.http.get<ProyectosResponse>(`${environment.baseUrl}/proyectos`).subscribe({
    next: (resp) => {
      this.proyectos.set(resp.proyectos);
      console.log('LA RESPUESTA DE PROYECTOS ES:', resp);
    },
    error: (err) => {
      console.log('Error fetching proyectos:', err);
    }
  });
}
}
