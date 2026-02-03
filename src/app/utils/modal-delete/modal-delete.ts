import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal-delete',
  imports: [NgClass],
  templateUrl: './modal-delete.html',
})
export class ModalDelete {
  // Controla la visibilidad del modal
  public isOpen = false;

  // Recibe el nombre del ítem a eliminar para mostrarlo en el mensaje
  @Input() itemName: string = '';

  // Emite un evento cuando el usuario hace clic en "Eliminar"
  @Output() onConfirm = new EventEmitter<void>();

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  confirmAction() {
    this.onConfirm.emit(); // Avisamos al componente padre
    this.close();
  }
// aras-list.ts
ejecutarEliminacionReal() {
  console.log('Procesando eliminación en la base de datos...');
  // Aquí llamas a tu servicio de NestJS
}
 }
