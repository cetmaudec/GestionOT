import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';
import 'chartjs-plugin-colorschemes';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

	ordenTrabajoAct$: any = [];
	otPorc: any = [];

  motoGroup$: any = [];
  motoLabel: string[] = [];
  motoCant:  number[] = [];

  tipoGroup$: any = [];
  tipoLabel: string[] = [];
  tipoCant: number[] = [];

  comunaGroup$: any = [];
  comunaLabel: string[] = [];
  comunaCant: number[] = [];

  graphMoto: boolean = false;
  graphTipo: boolean = false;
  graphComuna: boolean = false;


	constructor(private http: HttpClient) {
	}

  async ngOnInit() {
    this.getActOT();
    this.motoGroup$ = await this.getMotoToPie();
    this.createChartMoto();
    this.tipoGroup$ = await this.getTipoToPie();
    this.createChartTipo();
    this.comunaGroup$ = await this.getComunaToPie();
    this.createChartComuna();
  }

  getActOT(){
    this.http.get('http://localhost:4000/group-actividad-ot/').subscribe((ot) => {
      this.ordenTrabajoAct$ = ot as []
      for(let ot of this.ordenTrabajoAct$.data){
        if(ot.finalizada == 0){
          this.otPorc.push({'orden': ot.ordenTrabajo, 'porcentaje': 0});
    		}else{
          this.otPorc.push({'orden': ot.ordenTrabajo, 'porcentaje': (ot.finalizada*100 / (ot.finalizada + ot.iniciada + ot.app)).toPrecision(3)});
    		}
    	}
    })
  }

  async getMotoToPie(){
    this.motoGroup$ = await this.http.get('http://localhost:4000/group-moto').toPromise();
    return this.motoGroup$;
  }

  async getTipoToPie(){
      this.tipoGroup$ = await this.http.get('http://localhost:4000/group-tipo').toPromise();
    return  this.tipoGroup$;
  }

  async getComunaToPie(){
    this.comunaGroup$ = await this.http.get('http://localhost:4000/group-comuna').toPromise();
    return  this.comunaGroup$;
  }

  createChartMoto(){
    for(let mt of this.motoGroup$.data){
       this.motoLabel.push(mt.motocicleta);
        this.motoCant.push(mt.cantidad);
    }

    var ctx = document.getElementById('myChart');
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

}
