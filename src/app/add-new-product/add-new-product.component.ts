import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

	Productoform: FormGroup;
	tipo$: any = [];
	private tipoAdd:boolean = false;
	
	datos = {
      nombre_tipo: ''
    };

    constructor(private formBuilder: FormBuilder, private http:HttpClient) {
    	this.Productoform = this.formBuilder.group({
    		nombre_tipo:['']
    	});
    }

    ngOnInit() {
    	this.getTipos();
    	this.CleanDatos();
    }

    getTipos(){
    	this.http.get('http://localhost:4000/tipo').subscribe(resp => this.tipo$ = resp as []);
    }

  	CleanDatos(){
  		this.Productoform.reset();
  		this.tipoAdd = false;
  	}

   onSubmit(){
   	if(this.Productoform.get('nombre_tipo')!=null){
   		this.tipoAdd = true;
   		this.datos = {
   			'nombre_tipo': this.Productoform.get('nombre_tipo').value
   		};
   		this.http.post('http://localhost:4000/add-tipo', this.datos, { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}).subscribe(
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
