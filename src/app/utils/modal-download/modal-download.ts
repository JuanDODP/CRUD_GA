import { ChangeDetectionStrategy, Component, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'modal-download',
  imports: [],
  templateUrl: './modal-download.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDownload {

    @ViewChild('modalDownloadCheckbox') modalDownloadCheckbox!: ElementRef<HTMLInputElement>;
   closeModal() {
    this.modalDownloadCheckbox.nativeElement.checked = false;
  }
    onDownload = output<void>();
    text= input.required<string>();
  confirmDownload() {
    this.onDownload.emit();
    this.closeModal();
  }
}
