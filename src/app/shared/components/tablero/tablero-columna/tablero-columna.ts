import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TableroCard } from '../tablero-card/tablero-card';
import { TableroItem } from '../../../../home/pages/tablero-page/tablero-page';

@Component({
  selector: 'app-tablero-columna',
  imports: [TableroCard],
  templateUrl: './tablero-columna.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableroColumna {
  titulo     = input.required<string>();
  dotClass   = input.required<string>();
  badgeClass = input.required<string>();
  pulse      = input(false);
  items      = input.required<TableroItem[]>();
  expandedId = input<number | null>(null);

  cardToggle = output<number>();
}
