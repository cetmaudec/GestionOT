import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.scss']
})
export class ClienteDetalleComponent implements OnInit {
	id: any;
	cliente$: any = [];
	otRelacionadas$: any = [];


	datos = {
		id:''
	}
	updateEmail: Boolean = false;
	updateTelefono: Boolean = false;
	updateCelular: Boolean = false;
	updateDireccion: Boolean = false;

	EmailEditform: FormGroup;
	TelefonoEditform: FormGroup;
	CelularEditform: FormGroup;
	DireccionEditform: FormGroup;

	dato_email = {
		email:''
	}

	dato_telefono = {
		telefono:''
	}

	dato_celular = {
		celular:''
	}

	dato_direccion = {
		calle:'',
		numero:'',
		depto:'',
		comuna:'',
		pais:''
	}


	constructor(private activatedRoute: ActivatedRoute, private router: Router, private http:HttpClient, private formBuilder: FormBuilder) {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.EmailEditform = this.formBuilder.group({
			nuevoEmail:['']
		});
		this.TelefonoEditform = this.formBuilder.group({
			nuevoTelefono:['']
		});
		this.CelularEditform = this.formBuilder.group({
			nuevoCelular:['']
		});
		this.DireccionEditform = this.formBuilder.group({
			Dir_calle:[''],
			Dir_numero:[''],
			Dir_depto:[''],
			Dir_comuna:[''],
			Dir_pais:['']
		});
	}

	ngOnInit() {
   		this.getData();
   		console.log(this.cliente$)
	}

	getData(){
    this.http.get('http://localhost:4000/cliente/'+this.id).subscribe(
      resp => this.cliente$ = resp as []
    );
    this.http.get('http://localhost:4000/select-ot/'+this.id).subscribe(
      resp => this.otRelacionadas$ = resp as []
    );
	}

	UpdateData(tipo:string){
		if(tipo=="email"){
			this.updateEmail = true;
			console.log("email");
		}else if(tipo=="telefono"){
			this.updateTelefono = true;
			console.log("telefono");
		}else if(tipo=="celular"){
			this.updateCelular = true;
			console.log("celular");
		}else if(tipo=="direccion"){
			this.updateDireccion = true;
			console.log("direccion");
		}else{
			console.log("nada");
		}
	}

	onSubmitEmail(){
		if(this.updateEmail==true && this.CelularEditform.get('nuevoEmail').value!=null ){
			this.dato_email = {
				'email': this.EmailEditform.get('nuevoEmail').value
			};
			this.http.put('http://localhost:4000/update-email/'+this.id, this.dato_email, {
	        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
	      }).subscribe(
	      (response) => {
	        console.log('response from post data is ', response);
	      },(error)=>{
	        console.log('error during post is ', error)
	      });
	      this.updateEmail=false;
	      this.ngOnInit();
		}
	}

	onSubmitTelefono(){
		if(this.updateTelefono==true && this.CelularEditform.get('nuevoTelefono').value!=null ){
			this.dato_telefono = {
				'telefono': this.TelefonoEditform.get('nuevoTelefono').value
			};
			this.http.put('http://localhost:4000/update-telefono/'+this.id, this.dato_telefono, {
	        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
	      }).subscribe(
	      (response) => {
	        console.log('response from post data is ', response);
	      },(error)=>{
	        console.log('error during post is ', error)
	      });
	      this.updateTelefono=false;
	      this.ngOnInit();
		}
	}

	onSubmitCelular(){
		if(this.updateCelular==true && this.CelularEditform.get('nuevoCelular').value!=null ){
			console.log(this.CelularEditform.get('nuevoCelular').value);
			this.dato_celular = {
				'celular': this.CelularEditform.get('nuevoCelular').value
			};
			this.http.put('http://localhost:4000/update-celular/'+this.id, this.dato_celular, {
	        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
	      	}).subscribe(
	      	(response) => {
	        		console.log('response from post data is ', response);
	      	},(error)=>{
	        	console.log('error during post is ', error)
	      	});
	      	this.updateCelular=false;
	      	this.ngOnInit();
		}
	}

	onSubmitDireccion(){
		if(this.updateDireccion==true){
			this.dato_direccion = {
				'calle': this.DireccionEditform.get('Dir_calle').value,
				'numero': this.DireccionEditform.get('Dir_numero').value,
				'depto': this.DireccionEditform.get('Dir_depto').value,
				'comuna': this.DireccionEditform.get('Dir_comuna').value,
				'pais': this.DireccionEditform.get('Dir_pais').value
			};

			this.http.put('http://localhost:4000/update-direccion/'+this.id, this.dato_direccion, {
	        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
	    	}).subscribe(
	      	(response) => {
	        	console.log('response from post data is ', response);
	      	},(error)=>{
	        	console.log('error during post is ', error)
	      	});
	      	this.updateDireccion=false;
	      	this.ngOnInit();
		}
	}

  gotoDetailsOT(idOT: any) {
    console.log(idOT);
    this.router.navigate(['/ficha-ind/', idOT]);
  }


}
