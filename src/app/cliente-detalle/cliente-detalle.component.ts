import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


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
	updateEmail: Boolean = false;
	updateTelefono: Boolean = false;
	updateDireccion: Boolean = false;

	EmailEditform: FormGroup;
	TelefonoEditform: FormGroup;
	CelularEditform: FormGroup;

	constructor(private activatedRoute: ActivatedRoute, private http:HttpClient, private formBuilder: FormBuilder) {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.EmailEditform = this.formBuilder.group({
			nuevoEmail:['']
		});
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

	UpdateData(tipo:string){
		if(tipo=="email"){
			this.updateEmail = true;
			console.log("email");
		}else if(tipo=="telefono"){
			this.updateTelefono = true;
			console.log("telefono");
		}else if(tipo=="direccion"){
			this.updateDireccion = true;
			console.log("direccion");
		}else{
			console.log("nada");
		}

	}

}
