import {Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ClrIconModule, ClrVerticalNavModule} from "@clr/angular";
import {boltIcon, certificateIcon, ClarityIcons, lineChartIcon, userIcon} from "@cds/core/icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ClrIconModule,
    ClrVerticalNavModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    ClarityIcons.addIcons(boltIcon);
    ClarityIcons.addIcons(userIcon);
    ClarityIcons.addIcons(lineChartIcon);
    ClarityIcons.addIcons(certificateIcon);
  }
}
