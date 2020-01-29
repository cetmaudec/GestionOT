import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from'sweetalert2'


@Component({
  selector: 'app-actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.scss']
})
export class ActividadDetalleComponent implements OnInit {
	//id Relacion
	idAct: any;
	actividad$: any = [];

	editMaterial: Boolean = false;
	editTiempoEstimado: Boolean = false;
	editCosto: Boolean = false;
	fechaFin: Boolean = false;
	fechaInicio: Boolean = false;

	anio: number;
	mes: number;
	dia: number;
	hours: number;
	minutes: number;
	seconds: number;
	displayDate: any;
	date: any;

	MaterialEditform: FormGroup;
	TiempoEditform: FormGroup;
	CostoEditform: FormGroup;
	FechaInicioEditform: FormGroup;
	FechaFinEditform: FormGroup;

	dato_Material = {
		material:''
	}

	dato_Costo = {
		costo:''
	}

	dato_FechaI = {
		inicio:''
	}

	dato_FechaF = {
		fin:''
	}

	dato_Tiempo = {
		tiempo:''
	}

	dato = {
    	estado: ''
  	}

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private http:HttpClient, private formBuilder: FormBuilder) {
		this.idAct= this.activatedRoute.snapshot.paramMap.get('id');
		this.MaterialEditform = this.formBuilder.group({
			nuevoMaterial:['']
		});
		this.TiempoEditform = this.formBuilder.group({
			nuevoTiempo:['']
		});
		this.CostoEditform = this.formBuilder.group({
			nuevoCosto:['']
		});
		this.FechaInicioEditform = this.formBuilder.group({
			nuevoInicio:['']
		});
		this.FechaFinEditform = this.formBuilder.group({
			nuevoFin:['']
		});
		this.displayDate = new Date();
		this.anio = this.displayDate.getFullYear();
		this.mes = this.displayDate.getMonth()+1;
		this.dia = this.displayDate.getDate();
		this.hours = this.displayDate.getHours();
		this.minutes = this.displayDate.getMinutes();
		this.seconds = this.displayDate.getSeconds();
	}

  	ngOnInit() {
  		this.getData();
  	}

  	getData(){
	    this.http.get('http://localhost:4000/act_OT/select/'+this.idAct).subscribe(
	      resp => this.actividad$ = resp as []
	    );
	}


  	Edit(tipo:any){
  		if(tipo=='materiales'){
  			this.editMaterial = true;
  		}else if(tipo == 'tiempo'){
  			this.editTiempoEstimado = true;
  		}else if(tipo == 'costo'){
  			this.editCosto = true;
  		}else if(tipo == 'fechaFin'){
  			this.fechaFin = true;
  		}else if(tipo == 'fechaInicio'){
  			this.fechaInicio = true;
  		}
  	}


  	onSubmitMaterial(){
  		if(this.editMaterial==true && this.MaterialEditform.get('nuevoMaterial').value!='' ){
  			console.log(this.MaterialEditform.get('nuevoMaterial').value);
			this.dato_Material = {
				'material': this.MaterialEditform.get('nuevoMaterial').value
			};
			this.http.put('http://localhost:4000/act_OT/material/insert/'+this.idAct, this.dato_Material,  {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							html: '<h3>Se ha actualizado el ítem materiales</h3>',
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
	      this.editMaterial=false;
	  	}else if(this.editMaterial==true){
	  		this.editMaterial=false;
	  	}
	  	this.ngOnInit();
	}

	onSubmitTiempo(){
  		if(this.editTiempoEstimado==true && this.TiempoEditform.get('nuevoTiempo').value!='' ){
			this.dato_Tiempo = {
				'tiempo': this.TiempoEditform.get('nuevoTiempo').value
			};
			this.http.put('http://localhost:4000/act_OT/tiempo/update/'+this.idAct, this.dato_Tiempo, {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							html: '<h3>Se ha actualizado tiempo estimado de ejecución</h3>',
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
			this.editTiempoEstimado=false;
	      }else if(this.editTiempoEstimado==true){
	  		this.editTiempoEstimado=false;
	  	}
	  	
	}

	onSubmitCosto(){
  		if(this.editCosto==true && this.CostoEditform.get('nuevoCosto').value!='' ){
			this.dato_Costo = {
				'costo': this.CostoEditform.get('nuevoCosto').value
			};
			this.http.put('http://localhost:4000/act_OT/costo/insert/'+this.idAct, this.dato_Costo,  {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							html: '<h3>Se ha actualizado el costo de ejecución</h3>',
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
	      this.editCosto=false;
	      }else if(this.editCosto==true){
	  		this.editCosto=false;
	  	}
	  	this.ngOnInit();
	}

	onSubmitInicio(){
  		if(this.fechaInicio==true && this.FechaInicioEditform.get('nuevoInicio').value!='' ){
			this.dato_FechaI = {
				'inicio': this.FechaInicioEditform.get('nuevoInicio').value
			};
			this.http.put('http://localhost:4000/act_OT/inicio/update/'+this.idAct, this.dato_FechaI,  {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							html: '<h3>Se ha actualizado el inicio de la actividad</h3>',
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
	      this.fechaInicio=false;
	      this.EstadoActividad('Iniciada');
		}else if(this.fechaInicio==true){
	  		this.fechaInicio=false;
	  	}
	  	this.ngOnInit();
	}

	onSubmitFin(){
  		if(this.fechaFin==true && this.FechaFinEditform.get('nuevoFin').value!='' ){
			this.dato_FechaF = {
				'fin': this.FechaFinEditform.get('nuevoFin').value
			};
			this.http.put('http://localhost:4000/act_OT/fin/update/'+this.idAct, this.dato_FechaF, {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							html: '<h3>Se ha actualizado el fin de la actividad</h3>',
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
	      this.fechaFin=false;
	      this.EstadoActividad('Finalizada');
		}else if(this.fechaFin==true){
	  		this.fechaFin=false;
	  	}
	  	this.ngOnInit();
	}

	CurrentTime(){
		var dateTime;
		this.displayDate = new Date();
		this.anio = this.displayDate.getFullYear();
		this.mes = this.displayDate.getMonth()+1;
		this.dia = this.displayDate.getDate();
		this.hours = this.displayDate.getHours();
		this.minutes = this.displayDate.getMinutes();
		this.seconds = this.displayDate.getSeconds();
		dateTime = this.anio+'/'+this.mes+'/'+this.dia+" "+this.hours+":"+this.minutes+":"+this.seconds;
		return dateTime
	}

	ActionDate(action:any){
		this.date = this.CurrentTime();
		console.log(this.date);
		if(action == 'inicio'){
			console.log("inicio");
			this.dato_FechaI = {
				'inicio': this.date,
			};
			this.EstadoActividad('Iniciada');
			this.http.put('http://localhost:4000/act_OT/inicio/update/'+this.idAct, this.dato_FechaI,  {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							html: '<h3>Se ha dado inicio a la actividad</h3>',
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
		}else if(action='final'){
			console.log('fin');
			this.dato_FechaF = {
				'fin': this.date,
			};
			this.EstadoActividad('Finalizada');
			this.http.put('http://localhost:4000/act_OT/fin/update/'+this.idAct, this.dato_FechaF, {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							html: '<h3>Se ha dado por finalizada la actividad</h3>',
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
		this.ngOnInit();
	}

	 EstadoActividad(estadoAct: any) {
     this.dato= {
        'estado': estadoAct
      };
      this.http.put('http://localhost:4000/act_OT/estado/update/'+this.idAct, this.dato, {responseType: 'text'}).subscribe(
        (response) => {
          console.log('response from post data is ', response);
        },(error)=>{
          console.log('error during post is ', error)
        });
      this.ngOnInit();
  }

	BackOT(idOT:any){
		console.log(idOT)
		this.router.navigate(['/ficha-ind/', idOT]);
	}

}
