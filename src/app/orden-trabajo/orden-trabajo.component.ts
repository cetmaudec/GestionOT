import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.scss']
})
export class OrdenTrabajoComponent implements OnInit {

  OTform: FormGroup;
  Clienteform: FormGroup;

  private estadoCliente = false
  private esPrioritario = false
  private dejaMoto = false
  prioritario: any = 0;
  dejamoto: any = 0;

  cliente$: any = [];
  tipo$: any = [];
  motocicleta$: any = [];
  anio$: any = [];
  prioridade$: any = [];

  clienteOT = {
      nombre:null,
      apellidoPat:null,
      apellidoMat:null,
      rut:null,
      correo:null,
      Dir_calle:null,
      Dir_numero:null,
      Dir_depto:null,
      Dir_comuna:null,
      Dir_pais:null,
      Telefono:null,
      Celular:null
  }

  dataOT = {
    nombreCliente:null,
    idMotocicleta:null,
    Anio:null,
    Tipo:null,
    FechaLlegada:null,
    FechaEntrega:null,
    esPrioridad:null,
    Prioridad:null,
    dejaMoto:null,
    estado:null
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    this.OTform = this.formBuilder.group({
      nombreCliente:[''],
      Motocicleta:['', Validators.required],
      Anio:['', Validators.required],
      Tipo:['',Validators.required],
      Prioridad:['',],
      FechaLlegada:['',Validators.required],
      FechaEntrega:['']
    });

    this.Clienteform = this.formBuilder.group({
      nombre:['', Validators.required],
      apellidoPat:['', Validators.required],
      apellidoMat:[''],
      rut:['', Validators.required],
      correo:['', Validators.required],
      Dir_calle:[''],
      Dir_numero:[''],
      Dir_depto:[''],
      Dir_comuna:['', Validators.required],
      Dir_pais:['', Validators.required],
      Telefono:[''],
      Celular:['', Validators.required],
    });
  }

  ngOnInit() {
    this.getClientes();
    this.getTipos();
    this.getMotocicletas();
    this.getPrioridades();
    this.CleanDatos();
  }

  AddClient(){
    this.estadoCliente=true;
  }

  EsPrioridad(){
    if( this.esPrioritario==false){
      this.esPrioritario=true;
      this.prioritario = 1;
    }else{
      this.esPrioritario=false;
      this.prioritario = 0;
    }
    console.log(this.esPrioritario);
  }

  DejaMoto(){
    if( this.dejaMoto==false){
      this.dejaMoto=true;
      this.dejamoto=1;
    }else{
      this.dejaMoto=false;
      this.dejamoto=0;
    }
    console.log(this.dejaMoto);
  }


  CleanDatos(){
    this.OTform.reset();
    this.Clienteform.reset();

    this.estadoCliente = false
    this.esPrioritario = false
    this.dejaMoto = false
    this.prioritario = 0;
    this.dejamoto = 0;
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

  getMotocicletas(){
    this.http.get('http://localhost:4000/motocicleta').subscribe(resp =>
      this.motocicleta$ = resp as []
      );
  }

  getPrioridades(){
    this.http.get('http://localhost:4000/prioridad').subscribe(resp =>
      this.prioridade$ = resp as []
      );
  }

  SubmitOTCliente(){
    this.dataOT = {
      'nombreCliente':this.OTform.get('nombreCliente').value,
      'idMotocicleta':this.OTform.get('Motocicleta').value,
      'Anio':this.OTform.get('Anio').value,
      'Tipo':this.OTform.get('Tipo').value,
      'FechaLlegada':this.OTform.get('FechaLlegada').value,
      'FechaEntrega':this.OTform.get('FechaEntrega').value,
      'esPrioridad': this.prioritario,
      'Prioridad':this.OTform.get('Prioridad').value,
      'dejaMoto': this.dejamoto,
      'estado': 'No iniciado'
    };
    this.http.post('http://localhost:4000/add-OT', this.dataOT, { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}).subscribe(
      (response) => {
        console.log('response from post data is ', response);
      },
      (error)=>{
        console.log('error during post is ', error)
      });
      this.ngOnInit();
    }

SubmitCliente(){
  this.clienteOT = {
    'nombre':this.Clienteform.get('nombre').value,
    'apellidoPat':this.Clienteform.get('apellidoPat').value,
    'apellidoMat':this.Clienteform.get('apellidoMat').value,
    'rut':this.Clienteform.get('rut').value,
    'correo':this.Clienteform.get('correo').value,
    'Dir_calle':this.Clienteform.get('Dir_calle').value,
    'Dir_numero':this.Clienteform.get('Dir_numero').value,
    'Dir_depto':this.Clienteform.get('Dir_depto').value,
    'Dir_comuna':this.Clienteform.get('Dir_comuna').value,
    'Dir_pais':this.Clienteform.get('Dir_pais').value,
    'Telefono':this.Clienteform.get('Telefono').value,
    'Celular':this.Clienteform.get('Celular').value
  }

  this.http.post('http://localhost:4000/add-Client', this.dataOT, { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}).subscribe(
    (response) => {
      console.log('response from post data is ', response);
    },
    (error)=>{
      console.log('error during post is ', error)
    });
    this.ngOnInit();

}


}
