import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { ProyectosList } from "../../../shared/components/proyectos/proyectos-list/proyectos-list";
import { ProyectoModalComponent } from "../../../shared/components/proyectos/add-proyecto-modal/add-proyecto-modal";
import { ModalDelete } from "../../../utils/modal-delete/modal-delete";
import { ProyectosService } from '../services/proyectos.service';
import { AreasService } from '../services/areas.service';

@Component({
  selector: 'app-proyectos-page',
  imports: [Navbar, ProyectosList, ProyectoModalComponent, ModalDelete],
  templateUrl: './proyectos-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProyectosPage {
proyectoService=inject(ProyectosService)
// inyectar el area para poderl autilizar
areasService=inject(AreasService)
onDeleteCheck() {
  const proyecto = this.proyectoService.selectedProyecto();
  if (proyecto) {
    this.proyectoService.deleteProyecto(proyecto.id);
    this.proyectoService.clearSelectedProyecto(); // Limpiar el proyecto seleccionado después de eliminar
    setTimeout(() => {
      this.proyectoService.resetIsSuccess();
    }, 2000);
  }
}
}
