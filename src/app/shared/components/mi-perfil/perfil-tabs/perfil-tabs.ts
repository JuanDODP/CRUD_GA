import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ActiveTab } from '../../../../home/pages/mi-perfil-page/mi-perfil-page';

@Component({
  selector: 'app-perfil-tabs',
  imports: [],
  templateUrl: './perfil-tabs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilTabs {
  activeTab        = input.required<ActiveTab>();
  asignacionesCount = input.required<number>();

  tabChange = output<ActiveTab>();

  setTab(tab: ActiveTab): void {
    this.tabChange.emit(tab);
  }
}
