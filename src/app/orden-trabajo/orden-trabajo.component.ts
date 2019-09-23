import { NgModule, Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Cliente, Marca, Modelo, Anio, Tipo, Prioridad, Actividad} from '../models/database.model';





@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.scss']
})
export class OrdenTrabajoComponent implements OnInit {

  OTform: FormGroup;
  submitted = false;
  success = false;
  private estadoCliente = false
  public show:boolean = false;
  public buttonName:any = 'Show';


  cliente$: Cliente[] = [ 
    {id:'01', nombre:'Juan Perez'}, 
    {id:'02', nombre:'Fulano Perez'}]

  marca$: Marca[] = [ 
    {id:'M1', nombre:'Marca 1'}, 
    {id:'M2', nombre:'Marca 2'}]
  
  modelo$: Modelo[] = [ 
    {id:'1A', nombre:'Modelo 1A'}, 
    {id:'1B', nombre:'Modelo 1B'},
    {id:'2A', nombre:'Modelo 2A'}, 
    {id:'2B', nombre:'Modelo 2B'}, 
    {id:'2C', nombre:'Modelo 2C'}]
    
  anio$: Anio[] = [ 
    {id:'2016', nombre:'Año 2016'}, 
    {id:'2017', nombre:'Año 2017'},
    {id:'2018', nombre:'Año 2018'},
    {id:'2019', nombre:'Año 2019'},
    {id:'2020', nombre:'Año 2020'}]

  tipo$: Tipo[] = [ 
    {id:'01', nombre:'Defensa'},
    {id:'02', nombre:'Parrillas'},
    {id:'03', nombre:'Anclaje'},
    {id:'04', nombre:'Manubrios'}, 
    {id:'05', nombre:'Respaldo'}]

  prioridad$: Prioridad[] = [ 
    {id:'01', nombre:'Prioridad 1'}, 
    {id:'02', nombre:'Prioridad 2'}, 
    {id:'03', nombre:'Prioridad 3'}]

  actividade$: Actividad[] = [ 
   {id:'act1', nombre:'Desarmar partes de moto'},
   {id:'act2', nombre:'Dimensionar tubos'},
   {id:'act3', nombre:'Dimensionar pletinas'},
   {id:'act4', nombre:'Perforar y redondear pletinas'},
   {id:'act5', nombre:'Curvar tubos'},
   {id:'act6', nombre:'Aplastar y perforar placa perilla'},
   {id:'act7', nombre:'Soldar estructura'},
   {id:'act8', nombre:'Pulir soldadura'},
   {id:'act9', nombre:'Probar estructura en la moto'},
   {id:'act10', nombre:'Enviar a electropontar'},
   {id:'act11', nombre:'Instalar producto en la moto'},
   {id:'act12', nombre:'Embalar producto para despacho'},
   {id:'act13', nombre:'Limpiar moto y entregar'}]

  constructor(private data: DataService, private formBuilder: FormBuilder) { 

  }

  ngOnInit() {
      this.OTform = this.formBuilder.group({
      nombreOT:[''],
      nombreCliente:[''],
      Marca:[''],
      Modelo:[''],
      Anio:[''],
      Tipo:[''],
      Prioridad:[''],
      FechaEntrega:[''],
      Actividad:['']
    });

    console.log(this.estadoCliente);
  }

  AddClient(){
    this.estadoCliente=true;
  }

  addClient(){
    this.estadoCliente = true;
    console.log(this.estadoCliente);
  return this.estadoCliente;
  }

  onSubmit() {
    this.submitted = true;

    console.log(this.estadoCliente);

    if (this.OTform.invalid) {
        return;
    }

    this.success = true;
  }



}
