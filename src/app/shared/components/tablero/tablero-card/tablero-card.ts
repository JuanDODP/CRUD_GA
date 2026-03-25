import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TableroItem } from '../../../../home/pages/tablero-page/tablero-page';

@Component({
  selector: 'app-tablero-card',
  imports: [],
  templateUrl: './tablero-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableroCard {
  item     = input.required<TableroItem>();
  expanded = input(false);

  toggleExpand = output<void>();

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0] ?? '').join('').toUpperCase().slice(0, 2);
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
  }
}
