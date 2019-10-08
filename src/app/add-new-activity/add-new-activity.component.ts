import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
    	this.http.get('http://localhost:4000/actividad').subscribe(resp =>
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
   		this.http.post('http://localhost:4000/add-actividad', this.datos, { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}).subscribe(
   			(response) => {
   				console.log('response from post data is ', response);
		  	},
		  	(error)=>{
		  		console.log('error during post is ', error)
		  	});
		  	this.ngOnInit();
	  	}
  	}  
}
