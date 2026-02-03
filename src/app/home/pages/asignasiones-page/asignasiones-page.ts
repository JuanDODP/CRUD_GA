import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { AsignasionesList } from "../../../shared/components/asignasiones/asignasiones-list/asignasiones-list";
import { AddAsignacionModal } from "../../../shared/components/asignasiones/add-asignacion-modal/add-asignacion-modal";

@Component({
  selector: 'app-asignasiones-page',
  imports: [Navbar, AsignasionesList, AddAsignacionModal],
  templateUrl: './asignasiones-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AsignasionesPage { }
