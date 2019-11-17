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
  DespachoChart2Group$: any = [];
  MaxDemanda$: any = [];

  PivotData: any[] = [];
  CountDespacho: number;
  CountInstalar: number;
  MesMaxDemanda: string;


  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.TipoChart1Group$ = await this.getDataChart1();
    this.DespachoChart2Group$ = await this.getDataChart2();
    this.MaxDemanda$ = await this.getDataChart3();
    this.createChart1();
    this.createChart2();
  }


  async getDataChart1(){
    this.TipoChart1Group$ = await this.http.get('http://localhost:4000/pivot-tipo-mes').toPromise();
    return this.TipoChart1Group$;
  }

  async getDataChart2(){
    this.DespachoChart2Group$ = await this.http.get('http://localhost:4000/cont-dejamoto').toPromise();
    return this.DespachoChart2Group$;
  }

  async getDataChart3(){
    this.MaxDemanda$ = await this.http.get('http://localhost:4000/max-demanda').toPromise();
    if(this.MaxDemanda$.data[0].mes == 1){
      this.MesMaxDemanda = 'Enero'
    }else if(this.MaxDemanda$.data[0].mes == 2){
      this.MesMaxDemanda = 'Febrero'
    }else if(this.MaxDemanda$.data[0].mes == 3){
      this.MesMaxDemanda = 'Marzo'
    }else if(this.MaxDemanda$.data[0].mes == 4){
      this.MesMaxDemanda = 'Abril'
    }else if(this.MaxDemanda$.data[0].mes == 5){
      this.MesMaxDemanda = 'Mayo'
    }else if(this.MaxDemanda$.data[0].mes == 6){
      this.MesMaxDemanda = 'Junio'
    }else if(this.MaxDemanda$.data[0].mes == 7){
      this.MesMaxDemanda = 'Julio'
    }else if(this.MaxDemanda$.data[0].mes == 8){
      this.MesMaxDemanda = 'Agosto'
    }else if(this.MaxDemanda$.data[0].mes == 9){
      this.MesMaxDemanda = 'Septiembre'
    }else if(this.MaxDemanda$.data[0].mes == 10){
      this.MesMaxDemanda = 'Octubre'
    }else if(this.MaxDemanda$.data[0].mes == 11){
      this.MesMaxDemanda = 'Noviembre'
    }else if(this.MaxDemanda$.data[0].mes == 12){
      this.MesMaxDemanda = 'Diciembre'
    }
    return this.MaxDemanda$;
  }

  createChart1(){
    for(let pivot of this.TipoChart1Group$.data){
      console.log(pivot);
      this.PivotData.push(
      {
        label: pivot.tipo,
        data: [pivot.Enero, pivot.Febrero, pivot.Marzo, pivot.Abril, pivot.Mayo, pivot.Junio, pivot.Julio, pivot.Agosto, pivot.Septiembre, pivot.Octubre, pivot.Noviembre, pivot.Diciembre]
      })
    }
    var ctx = document.getElementById("myLineChart");
    var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: this.PivotData
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        colorschemes: {
          scheme: 'tableau.Classic20'
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
          display: true,
          position: 'bottom',
          align: 'center'

        },
    }
    });
  }

  createChart2(){
    for(let entrega of this.DespachoChart2Group$.data){
      if( entrega.dejaMoto == 0 ){
        this.CountDespacho = entrega.cantidad;
      }else if( entrega.dejaMoto == 1 ){
        this.CountInstalar = entrega.cantidad;
      }
    }

    var ctx = document.getElementById('myChart2');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Despacho','Instalación'],
            datasets: [{
                data:[this.CountDespacho, this.CountInstalar],
                borderWidth: 1
            }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            colorschemes: {
              scheme: 'office.Parallax6'
            }
          },
          legend: {
            display: true,
            position: 'right',
            align: 'center'

          },
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
        }
    });
  }

}
