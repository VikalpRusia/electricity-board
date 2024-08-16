import {Inject, Injectable} from '@angular/core';
import {WebService} from "./web.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {

  baseUrl: string = 'api/v1/records';

  constructor(@Inject(WebService)
              protected readonly webService: WebService,) {
  }

  getApplicants(pageSize: number, pageNumber: number, filters: any[] | undefined, sortData: {
    by: any,
    reverse: boolean
  } | undefined, startDate: any, endDate: any): Observable<any> {
    let url = `${this.baseUrl}?page_size=${pageSize}&page_number=${pageNumber}`
    if (startDate !== undefined && startDate !== null) {
      url += `&start_date=${startDate}&end_date=${endDate}`;
    }
    if (filters != undefined) {
      const filters_str = filters.map((filter) => `filter_${filter.property}=${filter.value}`).join("&")
      url += `&${filters_str}`
    }
    if (sortData != undefined) {
      url += `&sort_${sortData.by}=${sortData.reverse ? -1 : 0}`
    }
    return this.webService.get(url)
  }

  putApplicants(applicantId: number, applicantData: any) {
    let url = `${this.baseUrl}/${applicantId}`
    return this.webService.put(url, applicantData)
  }

  getApplicantsCount(filters: any[] | undefined, startDate: any, endDate: any): Observable<any> {
    let url = `${this.baseUrl}/count?`
    if (startDate !== undefined && startDate !== null) {
      url += `start_date=${startDate}&end_date=${endDate}`;
    }
    if (filters != undefined) {
      const filters_str = filters.map((filter) => `filter_${filter.property}=${filter.value}`).join("&")
      url += `&${filters_str}`
    }
    return this.webService.get(url)
  }

  getDistinctStatus(): Observable<any> {
    return this.webService.get(`${this.baseUrl}/distinct-status`)
  }
}
