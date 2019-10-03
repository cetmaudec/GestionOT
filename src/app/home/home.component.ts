import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Cliente } from '../models/database.model';
import { ApiService } from '../api.service'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {	

	cliente$: any = [];

	constructor(private apiService: ApiService, private http: HttpClient) {

	}

    ngOnInit(): void {
	    this.http.get('http://localhost:4000/user').subscribe(resp => 
	      this.cliente$ = resp as []
	      );
    }

}
