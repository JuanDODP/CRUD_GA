import {  Component, inject, input } from '@angular/core';
import { ProyectoModalComponent } from "../add-proyecto-modal/add-proyecto-modal";
import { Proyecto } from '../../../../home/interface/proyectos.interface';
import { ProyectosService } from '../../../../home/pages/services/proyectos.service';

@Component({
  selector: 'app-proyectos-list',
  imports: [],
  templateUrl: './proyectos-list.html',
})
export class ProyectosList {
  proyectos= input.required<Proyecto[]>();
  proyectosService=inject(ProyectosService)
    clear(){
    this.proyectosService.clearSelectedProyecto();
  }
  getProyecto(proyecto:any) {
    this.proyectosService.setProyectoForEdit(proyecto)
  }

}
