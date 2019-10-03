import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.scss']
})
export class OrdenTrabajoComponent implements OnInit {

  OTform: FormGroup;
  private estadoCliente = false
  private esPrioritario = false

  cliente$: any = [];
  tipo$: any = [];
  marca$: any = [];
  modelo$: any = [];
  anio$: any = [];
  prioridade$: any = [];
  actividade$: any = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
      this.OTform = this.formBuilder.group({
      nombreOT:[''],
      nombreCliente:[''],
      Marca:[''],
      Modelo:[''],
      Anio:[''],
      Tipo:[''],
      Prioridad:[''],
      FechaLlegada:[''],
      FechaEntrega:[''],
      Actividad:['']
    });

       console.log(this.estadoCliente);
  }

  ngOnInit() {
    this.getClientes();
    this.getTipos();
    this.getMarcas();
    this.getModelos();
    this.getAnios();
    this.getPrioridades();
    this.getActividades();

  }

  AddClient(){
    this.estadoCliente=true;
  }
  EsPrioridad(){
    if( this.esPrioritario==false){
      this.esPrioritario=true;
    }else{
      this.esPrioritario=false;
    }
  }

  getClientes(){
    this.http.get('http://localhost:4000/cliente').subscribe(resp => 
      this.cliente$ = resp as []
      );
  }

  getTipos(){
    this.http.get('http://localhost:4000/tipo').subscribe(resp => 
      this.tipo$ = resp as []
      );
  }

  getMarcas(){
    this.http.get('http://localhost:4000/marca').subscribe(resp => 
      this.marca$ = resp as []
      );
  }

  getModelos(){
    this.http.get('http://localhost:4000/modelo').subscribe(resp => 
      this.modelo$ = resp as []
      );
  }

  getAnios(){
    this.http.get('http://localhost:4000/anio').subscribe(resp => 
      this.anio$ = resp as []
      );
  }

  getPrioridades(){
    this.http.get('http://localhost:4000/prioridad').subscribe(resp => 
      this.prioridade$ = resp as []
      );
  }
  getActividades(){
    this.http.get('http://localhost:4000/actividad').subscribe(resp => 
      this.actividade$ = resp as []
      );
  }

 /* onSubmit() {
    this.submitted = true;
    console.log(this.success);

    if (this.OTform.invalid) {
        return;
    }

    this.success = true;
  }*/



}
