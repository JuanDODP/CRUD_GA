import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { AsignasionesList } from "../../../shared/components/asignasiones/asignasiones-list/asignasiones-list";

@Component({
  selector: 'app-asignasiones-page',
  imports: [Navbar, AsignasionesList],
  templateUrl: './asignasiones-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AsignasionesPage { }
