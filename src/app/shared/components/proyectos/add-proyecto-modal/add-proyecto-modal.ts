import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyecto-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-proyecto-modal.html',
})
export class ProyectoModalComponent {
public isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }


}
