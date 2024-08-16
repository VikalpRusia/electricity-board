import {Routes} from '@angular/router';
import {ChartsComponent} from "./charts/charts.component";
import {TableComponent} from "./table/table.component";
import {HomeComponent} from "./home/home.component";
import {CreditsComponent} from "./credits/credits.component";

export const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', redirectTo: 'details', pathMatch: 'full'},
      {path: 'details', component: TableComponent},
      {path: 'charts', component: ChartsComponent},
      {path: 'credits', component: CreditsComponent}
    ]
  }
];
