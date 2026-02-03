import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { ProyectosList } from "../../../shared/components/proyectos/proyectos-list/proyectos-list";
import { ProyectoModalComponent } from "../../../shared/components/proyectos/add-proyecto-modal/add-proyecto-modal";
import { ModalDelete } from "../../../utils/modal-delete/modal-delete";
interface Proyecto {
  idProyecto: number;
  nombreProyecto: string;
  fechaInicio: string;
  fechaFin: string;
  nombreArea: string; // El nombre que traemos de la FK
}
@Component({
  selector: 'app-proyectos-page',
  imports: [Navbar, ProyectosList, ProyectoModalComponent, ModalDelete],
  templateUrl: './proyectos-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProyectosPage {

}
