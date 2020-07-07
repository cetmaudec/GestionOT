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
	p: number = 1;

	constructor(private http: HttpClient, private router: Router) { }

	ngOnInit() {
		this.getClientes();
	}

	getClientes(){
		this.http.get('http://177.71.231.113:4000/cliente').subscribe(resp => 
			this.cliente$ = resp as []
			);
	}

	gotoDetails(clienteId: any) {
		this.router.navigate(['/cliente/', clienteId]);
	}
}
