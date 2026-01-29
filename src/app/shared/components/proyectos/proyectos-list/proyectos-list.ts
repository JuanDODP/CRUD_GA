import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
interface Proyecto {
  idProyecto: number;
  nombreProyecto: string;
  fechaInicio: string;
  fechaFin: string;
  nombreArea: string; // El nombre que traemos de la FK
}
@Component({
  selector: 'app-proyectos-list',
  imports: [DatePipe],
  templateUrl: './proyectos-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProyectosList {

   proyectos: Proyecto[] = [
    {
      idProyecto: 1,
      nombreProyecto: 'Rediseño Web',
      fechaInicio: '2024-01-15',
      fechaFin: '2024-03-20',
      nombreArea: 'Sistemas'
    },
    {
      idProyecto: 2,
      nombreProyecto: 'Campaña Verano',
      fechaInicio: '2024-02-01',
      fechaFin: '2024-02-28',
      nombreArea: 'Marketing'
    }
  ];
}
