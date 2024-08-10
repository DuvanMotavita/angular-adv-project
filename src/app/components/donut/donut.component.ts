import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-donut',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './donut.component.html',
  styleUrl: './donut.component.css',
})
export class DonutComponent implements OnInit {
  @Input() title: string = 'Without title';
  @Input() data: number[] = [];
  @Input() labels: string[] = [];

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales fake',
    'In-Store Sales fake',
    'Mail-Order Sales fake',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [150, 250, 300],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };

  ngOnInit(): void {
    if (this.labels.length > 0) {
      this.doughnutChartLabels = this.labels;
      this.doughnutChartData.labels = this.doughnutChartLabels;
      this.doughnutChartData.datasets[0].data = this.data;
    }
  }

  // public doughnutChartType: ChartType = 'doughnut';
  // public colors: any[] = [
  //   { backgroundColor: ['#9E120E', '#FF5800', '#FFB400'] },
  // ];
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
