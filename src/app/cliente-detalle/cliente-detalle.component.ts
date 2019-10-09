import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.scss']
})
export class ClienteDetalleComponent implements OnInit {
	id: any;
	cliente$: any = [];
	datos = {
		id:''
	}

	constructor(private activatedRoute: ActivatedRoute, private http:HttpClient) {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
	}

	ngOnInit() {
   		this.getData();  
   		console.log(this.cliente$)	
	}

	getData(){
		this.http.get('http://localhost:4000/select-cliente/'+this.id).subscribe(
   			resp => this.cliente$ = resp as []
   			);	
	}

}
