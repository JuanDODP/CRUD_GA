import { ChangeDetectionStrategy, Component, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'modal-download-pdf',
  imports: [],
  templateUrl: './modal-download-pdf.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDownloadPdf {
     @ViewChild('modalPdfCheckbox') modalPdfCheckbox!: ElementRef<HTMLInputElement>;
   closeModal() {
    this.modalPdfCheckbox.nativeElement.checked = false;
  }
  onDownloadOPdf=output<void>();
  text= input.required<string>() // "Estás por bajar toda la información de las áreas en un archivo de Excel. ¿Deseas continuar?"
  confirmPdfDownload() {
    // Lógica para confirmar la descarga del PDF
    console.log('SE EJECUTOI LA FUNCION DE DESCARGAR PDF DESDE EL COMPONENTE HIJO');
    this.onDownloadOPdf.emit();
      this.closeModal();
  }

 }
