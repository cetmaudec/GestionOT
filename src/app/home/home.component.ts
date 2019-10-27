import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {	

	ordenTrabajoAct$: any = [];
	otPorc:any = [];

	constructor(private http: HttpClient) {

	}

    ngOnInit(): void {
    	this.getActOT();
    }


    getActOT(){
    	this.http.get('http://localhost:4000/group-actividad-ot/').subscribe((ot) => {
    		this.ordenTrabajoAct$ = ot as []
    		for(let ot of this.ordenTrabajoAct$.data){
    			if(ot.finalizada == 0){
    				this.otPorc.push({'orden': ot.ordenTrabajo, 'porcentaje': 0
    				});
    			}else{
    				this.otPorc.push({'orden': ot.ordenTrabajo, 'porcentaje': (ot.finalizada*100 / (ot.finalizada + ot.iniciada + ot.app)).toPrecision(3)
    				});
    			}
    		}
    	})
    }

}


/*
(ot) => 
    			this.ordenTrabajoAct$.push({
    				ordenTrabajo: ot.data.ordenTrabajo,
    				porcentaje: ot.finalizada / (ot.finalizada + ot.iniciada + ot.app)
    			}),
    			console.log(ot)
      	);
      	console.log(this.ordenTrabajoAct$);
*/