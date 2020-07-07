import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import Swal from'sweetalert2'


@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.scss']
})
export class ClienteDetalleComponent implements OnInit {
	id: any;
	cliente$: any = [];
	otRelacionadas$: any = [];
	p: number = 1;


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

	async ngOnInit() {
   		var ready = await this.getData();
   		this.updateEmail = false;
		this.updateTelefono = false;
		this.updateCelular = false;
		this.updateDireccion = false;
	}

	async getData(){
    	this.http.get('http://177.71.231.113:4000/cliente/'+this.id).subscribe(
      		resp => this.cliente$ = resp as []
    	);
    	this.http.get('http://177.71.231.113:4000/orden-trabajo/select/'+this.id).subscribe(
      		resp => this.otRelacionadas$ = resp as []
    	);
    	return true;
	}

	UpdateData(tipo:string){
		if(tipo=="email"){
			this.updateEmail = true;
		}else if(tipo=="telefono"){
			this.updateTelefono = true;
		}else if(tipo=="celular"){
			this.updateCelular = true;
		}else if(tipo=="direccion"){
			this.updateDireccion = true;
		}
	}

	onSubmitEmail(){
		if(this.updateEmail==true && this.EmailEditform.get('nuevoEmail').value!=null ){
			this.dato_email = {
				'email': this.EmailEditform.get('nuevoEmail').value
			};
		}else if(this.updateEmail){
			this.dato_email = {
				'email': this.cliente$[0].data.email
			};
		}

		this.http.put('http://177.71.231.113:4000/cliente/email/update/'+this.id, this.dato_email, {responseType: 'text'}).subscribe(
			response =>  Swal.fire({
  						html: '<h3>Se ha actualizado el email exitosamente</h3>',
  						confirmButtonText: 'Ok!'
  						}).then((result) => {
  							if (result.value) {
  								this.ngOnInit();
  							}
  						}) ,
			err => Swal.fire({
  					html: '<h3>Ha ocurrido un error, vuelva a intentarlo</h3>',
  					confirmButtonText: 'Ok!'
  						}).then((result) => {
  							if (result.value) {
  								this.ngOnInit();
  							}
  						}) 
		);
		
	}

	onSubmitTelefono(){
		if(this.updateTelefono==true && this.TelefonoEditform.get('nuevoTelefono').value!=null ){
			this.dato_telefono = {
				'telefono': this.TelefonoEditform.get('nuevoTelefono').value
			};
		}else if(this.updateTelefono == true){
			this.dato_telefono = {
				'telefono': this.cliente$[0].data.telefono
			};
		}
		this.http.put('http://177.71.231.113:4000/cliente/telefono/update/'+this.id, this.dato_telefono, {responseType: 'text'}).subscribe(
			response =>  Swal.fire({
  						html: '<h3>Se ha actualizado el número telefónico exitosamente</h3>',
  						confirmButtonText: 'Ok!'
  						}).then((result) => {
  							if (result.value) {
  								this.ngOnInit();
  							}
  						}) ,
			err => Swal.fire({
  					html: '<h3>Ha ocurrido un error, vuelva a intentarlo</h3>',
  					confirmButtonText: 'Ok!'
  						}).then((result) => {
  							if (result.value) {
  								this.ngOnInit();
  							}
  						}) 
		);
	}

	onSubmitCelular(){
		if(this.updateCelular==true && this.CelularEditform.get('nuevoCelular').value!=null ){
			this.dato_celular = {
				'celular': this.CelularEditform.get('nuevoCelular').value
			};
		}else if(this.updateCelular == true){
			this.dato_celular = {
				'celular': this.cliente$[0].data.celular
			};
		}
		this.http.put('http://177.71.231.113:4000/cliente/email/update/'+this.id, this.dato_celular, {responseType: 'text'}).subscribe(
			response =>  Swal.fire({
  						html: '<h3>Se ha actualizado el número celular exitosamente</h3>',
  						confirmButtonText: 'Ok!'
  						}).then((result) => {
  							if (result.value) {
  								this.ngOnInit();
  							}
  						}) ,
			err => Swal.fire({
  					html: '<h3>Ha ocurrido un error, vuelva a intentarlo</h3>',
  					confirmButtonText: 'Ok!'
  						}).then((result) => {
  							if (result.value) {
  								this.ngOnInit();
  							}
  						}) 
		);
		
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

			this.http.put('http://177.71.231.113:4000/cliente/direccion/update/'+this.id, this.dato_direccion, {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							html: '<h3>Se ha actualizado la dirección exitosamente</h3>',
  							confirmButtonText: 'Ok!'
  							}).then((result) => {
  								if (result.value) {
  									this.ngOnInit();
  								}
  							}) ,
				err => Swal.fire({
  						html: '<h3>Ha ocurrido un error, vuelva a intentarlo</h3>',
  						confirmButtonText: 'Ok!'
  							}).then((result) => {
  								if (result.value) {
  									this.ngOnInit();
  								}
  							}) 
			);
		}
	}

  gotoDetailsOT(idOT: any) {

    this.router.navigate(['/ficha-ind/', idOT]);
  }


}
