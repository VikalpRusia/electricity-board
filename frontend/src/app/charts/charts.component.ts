import {Component, Inject, OnInit} from '@angular/core';
import {ClrCommonFormsModule, ClrSelectModule} from "@clr/angular";
import {angleIcon, ClarityIcons} from "@cds/core/icon";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ChartsService} from "../services/charts.service";
import {LineChartModule} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    NgForOf,
    ClrCommonFormsModule,
    FormsModule,
    ClrSelectModule,
    LineChartModule
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit {

  selectedMonth: number | string = 6
  allMonths = [6, 12, 36, 60, "all"]

  chartData: any = null
  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year-Month';
  yAxisLabel: string = 'Application Count';
  timeline: boolean = true;

  constructor(@Inject(ChartsService)
              private readonly chartsService: ChartsService) {
    ClarityIcons.addIcons(angleIcon);
  }


  loadData() {
    this.chartsService.getChartData(
      this.selectedMonth == "all" ? null : this.selectedMonth as number
    ).subscribe({
      next: (data: any): void => {
        this.chartData = data;
        console.log(this.chartData);
      },
      error: (err): void => {
        console.error(err);
      },
    })


  }

  onChangeSelect(event: any): void {
    this.selectedMonth = event.target.value;
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }
}
