import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from'sweetalert2'


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
    	this.http.get('http://177.71.231.113:4000/tipo').subscribe(resp => this.tipo$ = resp as []);
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
   		this.http.post('http://177.71.231.113:4000/tipo/insert', this.datos, {responseType: 'text'}).subscribe(
   			response =>  Swal.fire({
                icon: 'success',
                title: 'Nuevo producto agregado existosamente!',
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
