import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {WebService} from "./web.service";

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  baseUrl: string = 'api/v1/charts';

  constructor(@Inject(WebService)
              protected readonly webService: WebService) {
  }

  getChartData(monthsToDisplay: number | null): Observable<any[]> {
    let url = `${this.baseUrl}/`;
    if (monthsToDisplay != null) {
      url += `?months_to_display=${monthsToDisplay}`;
    }
    return this.webService.get(url)
  }
}
