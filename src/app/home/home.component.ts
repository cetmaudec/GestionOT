import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
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

  User: any;

	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.User = localStorage.getItem('user');
    
	}

  async ngOnInit() {
    this.getActOT();
    this.motoGroup$ = await this.getMotoToPie();
    this.tipoGroup$ = await this.getTipoToPie();
    this.comunaGroup$ = await this.getComunaToPie();

   /*this.createChartComuna();
    this.createChartMoto();
    this.createChartTipo();*/
  }

  getActOT(){
    this.http.get('http://152.74.17.95:4000/group-actividad-ot/').subscribe((ot) => {
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
    this.motoGroup$ = await this.http.get('http://152.74.17.95:4000/motocicleta/groupby').toPromise();
    for(let mt of this.motoGroup$.data){
       this.motoLabel.push(mt.motocicleta);
       this.motoCant.push(mt.cantidad);
    }
    return this.motoGroup$;
  }

  async getTipoToPie(){
    this.tipoGroup$ = await this.http.get('http://152.74.17.95:4000/tipo/groupby').toPromise();
    for(let prod of this.tipoGroup$.data){
      this.tipoLabel.push(prod.tipo);
      this.tipoCant.push(prod.cantidad);
    }
    return  this.tipoGroup$;
  }

  async getComunaToPie(){
    this.comunaGroup$ = await this.http.get('http://152.74.17.95:4000/cliente/comuna/groupby').toPromise();
    for(let prod of this.comunaGroup$.data){
      this.comunaLabel.push(prod.comuna);
      this.comunaCant.push(prod.cantidad);
    }
    return  this.comunaGroup$;
  }
}
