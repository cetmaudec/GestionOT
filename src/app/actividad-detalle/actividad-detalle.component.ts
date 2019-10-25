import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
	}

  	ngOnInit() {
  		this.getData();
  	}

  	getData(){
	    this.http.get('http://localhost:4000/select-actividad/'+this.idAct).subscribe(
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
			this.http.put('http://localhost:4000/insert-material/'+this.idAct, this.dato_Material, {
	        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
	      }).subscribe(
	      (response) => {
	        console.log('response from post data is ', response);
	      },(error)=>{
	        console.log('error during post is ', error)
	      });
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
			this.http.put('http://localhost:4000/insert-tiempo/'+this.idAct, this.dato_Tiempo, {responseType: 'text'}).subscribe(
	      (response) => {
	        console.log('response from post data is ', response);
	      },(error)=>{
	        console.log('error during post is ', error)
	      });
			this.editTiempoEstimado=false;
	      }else if(this.editTiempoEstimado==true){
	  		this.editTiempoEstimado=false;
	  	}
	  	this.ngOnInit();
	}

	onSubmitCosto(){
  		if(this.editCosto==true && this.CostoEditform.get('nuevoCosto').value!='' ){
			this.dato_Costo = {
				'costo': this.CostoEditform.get('nuevoCosto').value
			};
			this.http.put('http://localhost:4000/insert-costo/'+this.idAct, this.dato_Costo, {responseType: 'text'}).subscribe(
	      (response) => {
	        console.log('response from post data is ', response);
	      },(error)=>{
	        console.log('error during post is ', error)
	      });
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
			this.http.put('http://localhost:4000/insert-inicio/'+this.idAct, this.dato_FechaI, {responseType: 'text'}).subscribe(
	      (response) => {
	        console.log('response from post data is ', response);
	      },(error)=>{
	        console.log('error during post is ', error)
	      });
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
			this.http.put('http://localhost:4000/insert-fin/'+this.idAct, this.dato_FechaF, {responseType: 'text'}).subscribe(
	      (response) => {
	        console.log('response from post data is ', response);
	      },(error)=>{
	        console.log('error during post is ', error)
	      });
	      this.fechaFin=false;
	      this.EstadoActividad('Finalizada');
		}else if(this.fechaFin==true){
	  		this.fechaFin=false;
	  	}
	  	this.ngOnInit();
	}

	ActionDate(action:any){
		this.date = this.anio+'/'+this.mes+'/'+this.dia;
		if(action == 'inicio'){
			console.log("inicio");
			this.dato_FechaI = {
				'inicio': this.date,
			};
			this.EstadoActividad('Iniciada');
			this.http.put('http://localhost:4000/insert-inicio/'+this.idAct, this.dato_FechaI, {responseType: 'text'}).subscribe(
	      (response) => {
	        console.log('response from post data is ', response);
	      },(error)=>{
	        console.log('error during post is ', error)
	      });
		}else if(action='final'){
			console.log('fin');
			this.dato_FechaF = {
				'fin': this.date,
			};
			this.EstadoActividad('Finalizada');
			this.http.put('http://localhost:4000/insert-fin/'+this.idAct, this.dato_FechaF, {responseType: 'text'}).subscribe(
	      (response) => {
	        console.log('response from post data is ', response);
	      },(error)=>{
	        console.log('error during post is ', error)
	      });
		}
		this.ngOnInit();
	}

	 EstadoActividad(estadoAct: any) {
     this.dato= {
        'estado': estadoAct
      };
      this.http.put('http://localhost:4000/estado-actividad/'+this.idAct, this.dato, {responseType: 'text'}).subscribe(
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
