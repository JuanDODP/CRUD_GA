import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-aras-list',
  imports: [],
  templateUrl: './aras-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArasList {
  public isOpen = false; // Esta es la que el botón pondrá en 'true'

  closeModal() {
    this.isOpen = false;
  }
}
