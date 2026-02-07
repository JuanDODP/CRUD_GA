import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { ArasList } from "../../../shared/components/areas/aras-list/aras-list";
import { ProyectosList } from "../../../shared/components/proyectos/proyectos-list/proyectos-list";
import { AsignasionesList } from "../../../shared/components/asignasiones/asignasiones-list/asignasiones-list";

@Component({
  selector: 'app-home-page',
  imports: [Navbar],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class HomePage { }
