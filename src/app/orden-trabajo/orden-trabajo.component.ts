import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import Swal from'sweetalert2'


@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.scss']
})
export class OrdenTrabajoComponent implements OnInit {

  OTform: FormGroup;
  Clienteform: FormGroup;

  estadoCliente = false
  esPrioritario = false
  dejaMoto = false
  prioritario: any = 0;
  dejamoto: any = 0;

  cliente$: any = [];
  tipo$: any = [];
  motocicleta$: any = [];
  anio$: any = [];
  prioridade$: any = [];
  actividade$: any = [];
  LastOT$: any = [];

  prueba:any;

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
    nombreCliente:'',
    idMotocicleta:'',
    marca:'',
    modelo:'',
    tipo:'',
    fechaLlegada:'',
    fechaEntrega:'',
    esPrioridad:'',
    prioridad:'',
    dejaMoto:'',
    estado:''
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.OTform = this.formBuilder.group({
      nombreCliente:[''],
      Motocicleta:['', Validators.required],
      Anio:['', Validators.required],
      Tipo:['',Validators.required],
      Prioridad:['',],
      FechaLlegada:['',Validators.required],
      FechaEntrega:['',Validators.required]
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
    this.CleanDatos();
    this.getClientes();
    this.getTipos();
    this.getMotocicletas();
    this.getPrioridades();
    this.getActividades();
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
    this.http.get('http://152.74.17.95:4000/cliente').subscribe(resp =>
      this.cliente$ = resp as []
      );
  }

  getTipos(){
    this.http.get('http://152.74.17.95:4000/tipo').subscribe(resp =>
      this.tipo$ = resp as []
      );
  }

  getMotocicletas(){
    this.http.get('http://152.74.17.95:4000/motocicleta').subscribe(resp =>
      this.motocicleta$ = resp as []
      );
  }

  getActividades(){
    this.http.get('http://152.74.17.95:4000/actividad').subscribe(resp =>
      this.actividade$ = resp as []
      );
  }

  getPrioridades(){
    this.http.get('http://152.74.17.95:4000/prioridad').subscribe(resp =>
      this.prioridade$ = resp as []
      );
  }


  sendActividades(){
    for(let act of this.actividade$.data){
      var datoAct = {
          //'idOT': this.idOT,
          'id': act.idActividad,
          'nombre': act.nombre_actividad
      };
      this.http.post('http://152.74.17.95:4000/act_OT/insert', datoAct, {responseType: 'text'}).subscribe(
        (response) => {
          console.log('response from post data is ', response);
        },
        (error)=>{
          console.log('error during post is ', error)
        }
      );
    }
  }


  SubmitOTCliente(){
    if(this.estadoCliente == true){
      this.dataOT = {
        'nombreCliente':this.cliente$.data[0].idCliente+1,
        'idMotocicleta':this.motocicleta$.data[this.OTform.get('Motocicleta').value].idMoto,
        'marca': this.motocicleta$.data[this.OTform.get('Motocicleta').value].marca,
        'modelo': this.motocicleta$.data[this.OTform.get('Motocicleta').value].modelo,
        'tipo':this.OTform.get('Tipo').value,
        'fechaLlegada':this.OTform.get('FechaLlegada').value,
        'fechaEntrega':this.OTform.get('FechaEntrega').value,
        'esPrioridad': this.prioritario,
        'prioridad':this.OTform.get('Prioridad').value,
        'dejaMoto': this.dejamoto,
        'estado': 'No iniciado'
      };
    }else{
      this.dataOT = {
        'nombreCliente':this.OTform.get('nombreCliente').value,
        'idMotocicleta':this.motocicleta$.data[this.OTform.get('Motocicleta').value].idMoto,
        'marca': this.motocicleta$.data[this.OTform.get('Motocicleta').value].marca,
        'modelo': this.motocicleta$.data[this.OTform.get('Motocicleta').value].modelo,
        'tipo':this.OTform.get('Tipo').value,
        'fechaLlegada':this.OTform.get('FechaLlegada').value,
        'fechaEntrega':this.OTform.get('FechaEntrega').value,
        'esPrioridad': this.prioritario,
        'prioridad':this.OTform.get('Prioridad').value,
        'dejaMoto': this.dejamoto,
        'estado': 'No iniciado'
      };
    }

    this.http.post('http://152.74.17.95:4000/orden-trabajo/insert', this.dataOT, {responseType: 'text'}).subscribe(
      response =>  Swal.fire({
                icon: 'success',
                title: 'Nueva orden de trabajo!',
                text: 'La OT ha sido creada exitosamente.',
                confirmButtonText: 'Ok!'
                }).then((result) => {
                  if (result.value) {
                    this.sendActividades(); 
                    this.router.navigate(['/ficha']);
                  }
                }) ,
        err => Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Ha ocurrido un error, vuelva a intentarlo'
          })
    );
    this.CleanDatos();      
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


    this.http.post('http://152.74.17.95:4000/cliente/insert', this.clienteOT, {responseType: 'text'}).subscribe(
      (response) => {

        console.log('response from post data is ', response);
      },
      (error)=>{
        console.log('error during post is ', error);
      }
    );
    this.SubmitOTCliente();
  }
}
