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

  ngOnInit() {
    this.getActOT();
    this.getMotoToPie();
    this.getTipoToPie();
    this.getComunaToPie();
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

  getMotoToPie(){
    this.http.get('http://localhost:4000/group-moto').subscribe((resp) => {
      this.motoGroup$ = resp as []
      for(let mt of this.motoGroup$.data){
        this.motoLabel.push(mt.motocicleta);
        this.motoCant.push(mt.cantidad);
      }
    });
  }

  getTipoToPie(){
    this.http.get('http://localhost:4000/group-tipo').subscribe((resp) => {
      this.tipoGroup$ = resp as []
      for(let prod of this.tipoGroup$.data){
        this.tipoLabel.push(prod.tipo);
        this.tipoCant.push(prod.cantidad);
      }
    });
  }

  getComunaToPie(){
    this.http.get('http://localhost:4000/group-comuna').subscribe((resp) => {
      this.comunaGroup$ = resp as []
      for(let cm of this.comunaGroup$.data){
        this.comunaLabel.push(cm.comuna);
        this.comunaCant.push(cm.cantidad);
      }
    });
  }

  createChartMoto(){
    if(this.graphMoto == false){
      this.graphMoto = true;
    }
    var ctx = document.getElementById("MotoChart");
    var chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.motoLabel,
        datasets: [{
            data: [1,2,3,4,5],
            fill: false
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
          display: false
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
    if(this.graphTipo == false){
      this.graphTipo = true;
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
          display: false
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
    if(this.graphComuna == false){
      this.graphComuna = true;
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
          display: false
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
