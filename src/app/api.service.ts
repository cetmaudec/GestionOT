import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import { Cliente } from './models/database.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	

	constructor(private http: HttpClient) { }

 	getUser(){
 		return this.http.get<Cliente>("http://localhost:4000/user");
  	}
  
}
 


