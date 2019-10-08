import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-add-motocicleta',
  templateUrl: './add-motocicleta.component.html',
  styleUrls: ['./add-motocicleta.component.scss']
})
export class AddMotocicletaComponent implements OnInit {

  Motocicletaform: FormGroup;
  moto$: any = [];
  marca$: any = [];
  count_marca$: any;
  
  private motoAdd: boolean = false;
  private nuevaMarca: boolean = false;

  datos_marca = {
    nombre_marca: ''
  };

  datos_modelo = {
    nombre_modelo: ''
  };
  datos_modeloMarca = {
    nombre_modelo: '',
    marca: ''
  }

  constructor(private formBuilder: FormBuilder, private http:HttpClient) { 
    this.Motocicletaform = this.formBuilder.group({
        Marca:[''],
        Nueva_Marca:[''],
        Modelo:['']
      });
}

  ngOnInit() {
    this.getModelosMarca();
    this.getMarcas();
    this.CleanDatos();
  }

  getModelosMarca(){
    this.http.get('http://localhost:4000/marca-modelo').subscribe(resp => 
      this.moto$ = resp as []
      );
  }

  getMarcas(){
    this.http.get('http://localhost:4000/marca').subscribe(resp => 
      this.marca$ = resp as []
      );
  }

  CleanDatos(){
    this.Motocicletaform.reset();
    this.motoAdd = false;
  }

  NuevaMarca(){
    if(this.nuevaMarca==false){
      this.nuevaMarca = true;
    }else{
      this.nuevaMarca=false;
    }
  }

  onSubmit(){
    if(this.Motocicletaform.get('Nueva_Marca')!=null && this.Motocicletaform.get('Modelo')!=null){
      //Agrega nueva marca y se inserta modelo
      this.motoAdd = true;
      this.datos_marca = {
        'nombre_marca': this.Motocicletaform.get('Nueva_Marca').value
      };
      this.http.post('http://localhost:4000/add-marca', this.datos_marca, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      }).subscribe(
      (response) => {
        console.log('response from post data is ', response);
      },(error)=>{
        console.log('error during post is ', error)
      });
      //Agrega modelo, obtiene marcac mediante conteo en serve.js
      this.datos_modelo = {
        'nombre_modelo': this.Motocicletaform.get('Modelo').value
      };
      this.http.post('http://localhost:4000/add-marca-modelo', this.datos_modelo, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      }).subscribe(
      (response) => {
        console.log('response from post data is ', response);
      },(error)=>{
        console.log('error during post is ', error)
      });

    }else if(this.Motocicletaform.get('Marca')!=null && this.Motocicletaform.get('Modelo')!=null){
      //Agrega sólo modelo mediante la respuesta del formulario
      this.datos_modeloMarca = {
        'nombre_modelo': this.Motocicletaform.get('Modelo').value,
        'marca': this.Motocicletaform.get('Marca').value
      };
      this.http.post('http://localhost:4000/add-marca-modelo', this.datos_modeloMarca, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      }).subscribe(
      (response) => {
        console.log('response from post data is ', response);
      },(error)=>{
        console.log('error during post is ', error)
      });
    }
    this.ngOnInit();
  }
}
