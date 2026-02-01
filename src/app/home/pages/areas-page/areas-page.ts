import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { ArasList } from "../../../shared/components/areas/aras-list/aras-list";
import { AreaModal } from "../../../shared/components/areas/area-modal/area-modal";

@Component({
  selector: 'app-areas-page',
  imports: [Navbar, ArasList, AreaModal],
  templateUrl: './areas-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AreasPage { }
