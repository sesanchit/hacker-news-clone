import { Component, OnInit, AfterViewInit, Input, OnChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-vote-chart',
  templateUrl: './vote-chart.component.html',
  styleUrls: ['./vote-chart.component.css']
})
export class VoteChartComponent implements OnInit, OnChanges {

  @Input() newsFeedStore: any;
  canvas: any;
  ctx: any;

  constructor() {
  }

  ngOnChanges() {
    this.buildChart();
  }

  ngOnInit() {
  }

  buildChart() {
    this.canvas = document.getElementById('voteChart');
    this.ctx = this.canvas.getContext('2d');

    const data = this.newsFeedStore;

    if (data) {
      const plotData = data.map(d => d.points);
      const labels = data.map(d => d.objectID);

      const minValue = Math.min(...plotData);
      const maxValue = Math.max(...plotData);


      const options = {
        responsive: true,
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#000",
            fontSize: 16
          }
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'ID',
              fontSize: 18,
              fontColor: '#000'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Votes',
              fontSize: 18,
              fontColor: '#000'
            },
            ticks: {
              max: maxValue,
              min: minValue,
              stepSize: 50,
            }
          }]
        },
      };

      const chartdata = {
        labels: labels,
        datasets: [
          {
            label: "# of votes",
            data: plotData,
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
          }
        ]
      };
      const voteChart = new Chart(this.ctx, {
        type: 'line',
        data: chartdata,
        options: options
      });
    }
  }

}
