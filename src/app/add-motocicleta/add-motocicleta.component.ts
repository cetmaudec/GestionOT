import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from'sweetalert2'

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

  bool:any;

  motoAdd: boolean = false;
  nuevaMarca: boolean = false;

  datos_marca = {
    nombre_marca: ''
  };

  datos_modeloMarca = {
    nombre_marca: '',
    nombre_modelo: ''
  }

  constructor(private formBuilder: FormBuilder, private http:HttpClient) {
    
}

  ngOnInit() {
    this.Motocicletaform = this.formBuilder.group({
        Marca:[''],
        Nueva_Marca:[''],
        Modelo:['', Validators.required]
      });
    this.getModelosMarca();
    this.getMarcas();
    this.CleanDatos();
  }

  getModelosMarca(){
    this.http.get('http://152.74.17.95:4000/motocicleta').subscribe(resp => 
      this.moto$ = resp as []
      );
  }

  getMarcas(){
    this.http.get('http://152.74.17.95:4000/marca').subscribe(resp =>
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

  async AddNuevaMarca(marca:any){
    this.datos_marca = {
        'nombre_marca': marca
      };
    this.bool = await this.http.post('http://152.74.17.95:4000/marca/insert', this.datos_marca, {responseType: 'text'}).toPromise();
    return true;
  }

  async onSubmit(){
    if(this.Motocicletaform.get('Nueva_Marca').value!=null ){
      this.bool = await this.AddNuevaMarca(this.Motocicletaform.get('Nueva_Marca').value);
      if(this.bool){
        this.datos_modeloMarca = {
          'nombre_marca': this.Motocicletaform.get('Nueva_Marca').value,
          'nombre_modelo': this.Motocicletaform.get('Modelo').value
        };
      }
    }else if(this.Motocicletaform.get('Marca').value!=null ){
      this.datos_modeloMarca = {
        'nombre_marca': this.Motocicletaform.get('Marca').value,
        'nombre_modelo': this.Motocicletaform.get('Modelo').value
      };
    }

    this.http.post('http://152.74.17.95:4000/motocicleta/insert', this.datos_modeloMarca, {responseType: 'text'}).subscribe(
      response =>  Swal.fire({
                icon: 'success',
                title: 'Nuevo modelo ha sido agregado existosamente!',
                confirmButtonText: 'Ok!'
                }).then((result) => {
                  if (result.value) {
                    this.ngOnInit();
                  }
                }) ,
        err => Swal.fire({
              icon: 'error',
              title: 'Ha ocurrido un error, vuelva a intentarlo'
          })
      );
  }
}

