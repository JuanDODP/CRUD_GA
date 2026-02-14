import {  Component, inject, input } from '@angular/core';
import { ProyectoModalComponent } from "../add-proyecto-modal/add-proyecto-modal";
import { Proyecto } from '../../../../home/interface/proyectos.interface';
import { ProyectosService } from '../../../../home/pages/services/proyectos.service';
import { AlertSucess } from "../../../../utils/alert-sucess/alert-sucess";
import { ActionAlertError } from "../../../../utils/action-alert-error/action-alert-error";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proyectos-list',
  imports: [AlertSucess, ActionAlertError, DatePipe],
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

    isSuccess = this.proyectosService.isSuccess;
    isError = this.proyectosService.isError;

    // descargar excel
    exportToExcel() {
      this.proyectosService.exportToExcel();
    }

}
