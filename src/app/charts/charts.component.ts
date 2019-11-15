import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';
import 'chartjs-plugin-colorschemes';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  TipoChart1Group$: any = [];
  DistTipo$: any[] = [];
  motoLabel: string[] = [];
  motoCant:  number[] = [];

  constructor() { }

  async ngOnInit() {
    this.TipoChart1Group$ = await this.getDataChart1();
    this.DistTipo = await this.getTipo();
    this.createChart1();
  }

  async getTipo(){
      this.DistTipo$ = await this.http.get('http://localhost:4000/tipo').toPromise();
      return this.DistTipo$;
  }

  async getDataChart1(){
    this.TipoChart1Group$ = await this.http.get('http://localhost:4000/select-group-tipo/').toPromise();
    return this.TipoChart1Group$;
  }

  createChart1(){
    for(let tipo of DistTipo$.data){
      for(let info of TipoChart1Group$.data){



      }
    }

    var ctx = document.getElementById("myLineChart");
    var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Earnings",
        data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
      },{
        label: "Earnings",
        data: [0, 1000, 500, 1500, 1000, 2000, 1500, 2500, 2000, 3000, 2500, 4000],
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        colorschemes: {
          scheme: 'office.BlueWarm6'
        }
      },
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },

      legend: {
        display: false
      }
    }
    });
  }

}
