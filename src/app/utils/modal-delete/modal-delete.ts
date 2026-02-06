import { Component, EventEmitter, Output, Input, signal, input, inject, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { AreasService } from '../../home/pages/services/areas.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.html',
})
export class ModalDelete {
  text = input.required<string>();
  onDelete = output<void>();
  deleteConfirm() {
    this.onDelete.emit();
  }



}
