import { NgModule, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

	addMoto: boolean = false;
	addTipo: boolean = false;
	addActividad: boolean = false;

    constructor(private http:HttpClient) {
    }

    ngOnInit() {
    }


	AddComponent(component: any){
		if(component == 'moto'){
			this.addTipo = false;
			this.addActividad = false;
			this.addMoto = true;

		}
		else if(component =='tipo'){
			this.addActividad = false;
			this.addMoto = false;
			this.addTipo = true;
		}
		else if(component == 'actividad'){
			this.addMoto = false;
			this.addTipo = false;
			this.addActividad = true;
		}
	}

}
