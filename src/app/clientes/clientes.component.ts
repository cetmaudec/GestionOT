import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

	cliente$: any = [];

	constructor(private http: HttpClient, private router: Router) { }

	ngOnInit() {
		this.getClientes();
	}

	getClientes(){
		this.http.get('http://localhost:4000/cliente').subscribe(resp => 
			this.cliente$ = resp as []
			);
	}

	gotoDetails(clienteId: any) {
		console.log(clienteId);
		this.router.navigate(['/cliente/', clienteId]);
	}
}
