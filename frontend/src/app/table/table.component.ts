import {Component, Inject} from '@angular/core';
import {ApplicantDetailsComponent} from "../applicant-details/applicant-details.component";
import {ClrDatagridModule, ClrDatagridStateInterface} from "@clr/angular";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApplicantsService} from "../services/applicants.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ApplicantDetailsComponent,
    ClrDatagridModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  loading: boolean = false;
  pageSize: number = 20
  pageNumber: number = 1
  jsonData: any = [];
  totalCount: number = 100;

  constructor(
    @Inject(ApplicantsService)
    private readonly applicantsService: ApplicantsService,
  ) {
  }

  async refresh(state: ClrDatagridStateInterface): Promise<void> {
    const pageSize = state.page?.size;
    const pageNumber = state.page?.current;
    const filters: any[] | undefined = state.filters;
    const sort: { by: any, reverse: boolean } | undefined = state.sort;
    if (pageSize !== undefined) {
      this.pageSize = pageSize;
    }
    if (pageNumber !== undefined) {
      this.pageNumber = pageNumber;
    }
    await this.loadData(filters, sort);
  }

  async loadData(filters: any[] | undefined, sortData: { by: any, reverse: boolean } | undefined): Promise<void> {
    this.loading = true;
    const [jsonData, totalCount]: [any, number] = await Promise.all([
      await firstValueFrom(
        this.applicantsService.getApplicants(
          this.pageSize,
          this.pageNumber,
          filters,
          sortData,
          this.range.value.start?.toISOString(),
          this.range.value.end?.toISOString(),
        ),
      ),
      await firstValueFrom(
        this.applicantsService.getApplicantsCount(filters,
          this.range.value.start?.toISOString(),
          this.range.value.end?.toISOString(),),
      ),
    ]);
    this.jsonData = jsonData;
    this.totalCount = totalCount;
    this.loading = false;
  }

}
