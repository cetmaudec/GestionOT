import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from'sweetalert2'
import { AuthService } from '../auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';


import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	newUser:any;

	constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient) { 
	
	}

  	ngOnInit() {
  		this.registerForm = this.formBuilder.group({
	  		name:['', Validators.required],
	  		email:['', Validators.required],
	  		user:['', Validators.required],
	  		password:['', Validators.required],
	  		confirm:['', Validators.required]
	  	})
  	}

  	registerUser(){
  		if(this.registerForm.get('password').value==this.registerForm.get('confirm').value){
  			this.newUser = {
  				'name': this.registerForm.get('name').value,
				'email': this.registerForm.get('email').value,
				'user': this.registerForm.get('user').value,
				'password': this.registerForm.get('password').value,
				'confirm': this.registerForm.get('confirm').value
			};
			this.http.post('http://localhost:4000/user/add', this.newUser, {responseType: 'text'}).subscribe(
				(response) => {
					console.log('response from post data is ', response);
				}
				);
			this.router.navigate(['/login']);
  			console.log("confirm");
  		}else{
  			console.log("clave incorrecta");
	   	}
	}
}
