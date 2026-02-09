import { Component, EventEmitter, Output, Input, signal, input, inject, output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.html',
})
export class ModalDelete {
  @ViewChild('modalCheckbox') modalCheckbox!: ElementRef<HTMLInputElement>;
   closeModal() {
    this.modalCheckbox.nativeElement.checked = false;
  }

  text = input.required<string>();
  onDelete = output<void>();
  deleteConfirm() {
    this.onDelete.emit();
    this.closeModal();
  }



}
