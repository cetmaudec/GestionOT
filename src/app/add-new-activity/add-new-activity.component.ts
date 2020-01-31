import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from'sweetalert2'

@Component({
  selector: 'app-add-new-activity',
  templateUrl: './add-new-activity.component.html',
  styleUrls: ['./add-new-activity.component.scss']
})
export class AddNewActivityComponent implements OnInit {

	Activityform: FormGroup;
	actividade$: any = [];
	private actAdd:boolean = false;
	
	datos = {
      nombre_actividad: ''
    };


    constructor(private formBuilder: FormBuilder, private http:HttpClient) {
    	this.Activityform = this.formBuilder.group({
    		nombre_actividad:['']
    	});
    }

    ngOnInit() {
    	this.getActividades();
    	this.CleanDatos();
    }

    getActividades(){
    	this.http.get('http://152.74.17.95:4000/actividad').subscribe(resp =>
    		this.actividade$ = resp as []
    		);
    }

    CleanDatos(){
    	this.Activityform.reset();
    	this.actAdd = false;
    }

    onSubmit(){
    	if(this.Activityform.get('nombre_actividad')!=null){
    		this.actAdd = true;
    		this.datos = {
   			'nombre_actividad': this.Activityform.get('nombre_actividad').value
   		};
   		this.http.post('http://152.74.17.95:4000/actividad/insert', this.datos, { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}).subscribe(
   			response =>  Swal.fire({
                icon: 'success',
                title: 'Nueva actividad agregada existosamente!',
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
}
