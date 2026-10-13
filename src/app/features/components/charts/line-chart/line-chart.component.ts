import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  Chart,
  ChartConfiguration,
  registerables
} from 'chart.js';

import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit {

  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  initializeChart(): void {

    const config: ChartConfiguration<'line'> = {

      type: 'line',

      data: {

        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],

        datasets: [
          // Current Dataset
          {
            label: 'Current',

            data: [1, 0.4, 3.2, 4],

            fill: true,

            tension: 0.5,

            borderWidth: 3,

            borderColor: '#1454FF',

            backgroundColor: 'rgba(20, 84, 255, 0.10)',

            pointRadius: 0,

            pointHoverRadius: 0
          },

          // Previous Dataset
          {
            label: 'Previous',

            data: [0.8, 0.7, 2.5, 3],

            fill: false,

            tension: 0.5,

            borderWidth: 2,

            borderColor: 'rgba(180, 186, 204, 0.8)',

            pointRadius: 0,

            pointHoverRadius: 0
          },

          // Previous Dataset
          {
            label: 'testing',

            data: [0.2, 0.7, 0.5, 2],

            fill: false,

            tension: 0.5,

            borderWidth: 1,

            borderColor: 'rgba(250, 16, 20, 0.8)',

            pointRadius: 0,

            pointHoverRadius: 0
          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        layout: {
          padding: 10
        },

        scales: {
          x: {

            grid: {
              display: false,
              // drawBorder: false
            },

            border: {
              display: false
            },

            ticks: {
              color: '#4B5B7A',

              font: {
                size: 16,
                weight: 400
              }
            }

          },

          y: {

            display: false,

            grid: {
              display: false,
              // drawBorder: false
            },

            border: {
              display: false
            }

          }

        },

        plugins: {

          legend: {

            display: true,

            position: 'top',

            align: 'end',

            labels: {

              usePointStyle: true,

              pointStyle: 'circle',

              boxWidth: 8,

              boxHeight: 8,

              padding: 20,

              color: '#4B5B7A',

              font: {
                size: 14
              }

            }

          },

          tooltip: {

            enabled: true,

            backgroundColor: '#ffffff',

            titleColor: '#000',

            bodyColor: '#000',

            borderColor: '#dfe3eb',

            borderWidth: 1,

            padding: 12

          },

          // Removed annotation zones
          annotation: {
            annotations: {}
          }

        },

        elements: {
          line: {
            capBezierPoints: true
          }

        }

      }

    };

    this.chart = new Chart(
      this.chartCanvas.nativeElement,
      config
    );

  }

}
