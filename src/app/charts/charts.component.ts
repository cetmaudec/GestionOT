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


  motoGroup$: any = [];
  motoLabel: string[] = [];
  motoCant:  number[] = [];

  tipoGroup$: any = [];
  tipoLabel: string[] = [];
  tipoCant: number[] = [];

  costoProducto$: any = [];
  costoLabel: string[] = [];
  costoCant: number[] = [];


  PrioridadChart4Group$: any = [];
  prioridadLabel: string[] = [];
  prioridadCount: number[] = [];

  comunaGroup$: any = [];
  comunaLabel: string[] = [];
  comunaCant: number[] = [];

  label: any = [];
  costo: any = [];
  tiempoEst: any = [];
  tiempoReal: any = [];


  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.MaxDemanda$ = await this.getDataChart3();
    
    this.TipoChart1Group$ = await this.getDataChart1();
    this.DespachoChart2Group$ = await this.getDataChart2();

    this.createChartFlujo();
    this.createChartDespachoInstala();

    this.PrioridadChart4Group$ = await this.getDataChartPrioridad();
    this.createChartPrioridad();
    this.motoGroup$ = await this.getMotoToPie();
    this.createChartMoto();
    this.tipoGroup$ = await this.getTipoToPie();
    this.createChartTipo();
    this.comunaGroup$ = await this.getComunaToPie();
    this.createChartComuna();
    this.costoProducto$ = await this.getCostoToFlow();
    this.createChartCosto();
  }


  async getDataChart1(){
    this.TipoChart1Group$ = await this.http.get('http://localhost:4000/pivot-tipo-mes').toPromise();
    return this.TipoChart1Group$;
  }

  async getDataChart2(){
    this.DespachoChart2Group$ = await this.http.get('http://localhost:4000/cont-dejamoto').toPromise();
    return this.DespachoChart2Group$;
  }

  async getMotoToPie(){
    this.motoGroup$ = await this.http.get('http://localhost:4000/group-moto').toPromise();
    return this.motoGroup$;
  }

  async getTipoToPie(){
      this.tipoGroup$ = await this.http.get('http://localhost:4000/group-tipo').toPromise();
    return  this.tipoGroup$;
  }

  async getCostoToFlow(){
      this.costoProducto$ = await this.http.get('http://localhost:4000/avg-costo').toPromise();
    return  this.costoProducto$;
  }

  async getComunaToPie(){
    this.comunaGroup$ = await this.http.get('http://localhost:4000/group-comuna').toPromise();
    return  this.comunaGroup$;
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

  async getDataChartPrioridad(){
    this.PrioridadChart4Group$ = await this.http.get('http://localhost:4000/cont-prioridad').toPromise();
    return this.PrioridadChart4Group$;
  }


  createChartFlujo(){
    for(let pivot of this.TipoChart1Group$.data){
      console.log(pivot);
      this.PivotData.push(
      {
        label: pivot.tipo,
        data: [pivot.Enero, pivot.Febrero, pivot.Marzo, pivot.Abril, pivot.Mayo, pivot.Junio, pivot.Julio, pivot.Agosto, pivot.Septiembre, pivot.Octubre, pivot.Noviembre, pivot.Diciembre]
      })
    }
    var ctx = document.getElementById("FlowChart");
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



  createChartDespachoInstala(){
    for(let entrega of this.DespachoChart2Group$.data){
      if( entrega.dejaMoto == 0 ){
        this.CountDespacho = entrega.cantidad;
      }else if( entrega.dejaMoto == 1 ){
        this.CountInstalar = entrega.cantidad;
      }
    }

    var ctx = document.getElementById('ChartDespachaInstala');
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

  createChartPrioridad(){
    for(let prior of this.PrioridadChart4Group$.data){
      if( prior.motivo_prioridad == 0 ){
        this.prioridadCount.push(prior.cantidad);
        this.prioridadLabel.push('No es prioridad');
      }else{
         this.prioridadCount.push(prior.cantidad);
         this.prioridadLabel.push(prior.motivo_prioridad);
      }
    }

    var ctx = document.getElementById('ChartPrioridad');
    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: this.prioridadLabel,
            datasets: [{
                data:this.prioridadCount,
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

  createChartMoto(){
    for(let mt of this.motoGroup$.data){
       this.motoLabel.push(mt.motocicleta);
        this.motoCant.push(mt.cantidad);
    }

    var ctx = document.getElementById('ChartMoto');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: this.motoLabel,
            datasets: [{
                data:this.motoCant,
                borderWidth: 1
            }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            colorschemes: {
              scheme: 'office.BlueWarm6'
            }
          },
          legend: {
            display: true,
            position: 'bottom',
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

  createChartTipo(){
    for(let prod of this.tipoGroup$.data){
      this.tipoLabel.push(prod.tipo);
      this.tipoCant.push(prod.cantidad);
    }
    var ctx = document.getElementById("TipoChart");
    var chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.tipoLabel,
        datasets: [{
            data: this.tipoCant,
            fill: false
          }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          colorschemes: {
            scheme: 'tableau.Temperature7'
          }
        },
        legend: {
          display: true,
          position: 'bottom',
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

  createChartComuna(){
    for(let prod of this.comunaGroup$.data){
      this.comunaLabel.push(prod.comuna);
      this.comunaCant.push(prod.cantidad);
    }
    var ctx = document.getElementById("ComunaChart");
    var chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.comunaLabel,
        datasets: [{
            data: this.comunaCant,
            fill: false
          }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          colorschemes: {
            scheme: 'tableau.HueCircle19'
          }
        },
        legend: {
          display: true,
          position: 'bottom',
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


  createChartCosto(){
    for(let item of this.costoProducto$.data){
      this.label.push(item.tipo);
      this.costo.push(item.costo);
      this.tiempoEst.push(item.tiempo_estimado);
      this.tiempoReal.push(item.tiempo_real);
   }
    var ctx = document.getElementById("LineChartCost");
    var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: this.label,
      datasets: [
      {
        label: 'Costo($)',
        data: this.costo
      },
      {
        label: 'Tiempo Real(días)',
        data: this.tiempoReal
      },
      {
        label: 'Tiempo Estimado(días)',
        data: this.tiempoEst
      }
    ]},
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

}
