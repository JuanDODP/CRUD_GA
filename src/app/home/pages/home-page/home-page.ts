import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";

@Component({
  selector: 'app-home-page',
  imports: [Navbar],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class HomePage { }
