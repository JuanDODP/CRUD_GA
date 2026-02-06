import {  Component, input } from '@angular/core';
import { ProyectoModalComponent } from "../add-proyecto-modal/add-proyecto-modal";
import { Proyecto } from '../../../../home/interface/proyectos.interface';

@Component({
  selector: 'app-proyectos-list',
  imports: [],
  templateUrl: './proyectos-list.html',
})
export class ProyectosList {
   public isOpen = false; // Esta es la que el botón pondrá en 'true'

  openModal() {
    this.isOpen = false;
  }
  proyectos= input.required<Proyecto[]>();
}
