import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Area, AreasReponse } from '../../interface/area.interface';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AreasService {
  // constructor() { }
   areas = signal<Area[]>([])
  private http = inject(HttpClient);
constructor(){
  this.getAreas()
}
getAreas (){
  this.http.get<AreasReponse>(`${environment.baseUrl}/areas`).subscribe({
    next: (resp) => {
      this.areas.set(resp.areas);
      console.log('LA RESPUESTA DE AREAS ES:', resp);
    },
    error: (err) => {
      console.log('Error fetching areas:', err);
    }
  });

}

}
