import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { ProyectosList } from "../../../shared/components/proyectos/proyectos-list/proyectos-list";
interface Proyecto {
  idProyecto: number;
  nombreProyecto: string;
  fechaInicio: string;
  fechaFin: string;
  nombreArea: string; // El nombre que traemos de la FK
}
@Component({
  selector: 'app-proyectos-page',
  imports: [Navbar, ProyectosList],
  templateUrl: './proyectos-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProyectosPage {

}
