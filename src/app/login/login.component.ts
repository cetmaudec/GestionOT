import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from'sweetalert2'
import { AuthService } from '../auth.service';

import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	data = {username: '', password: ''};

  	constructor(public formBuilder: FormBuilder, private router: Router) { 
	  	this.loginForm = this.formBuilder.group({
	      username: ['', Validators.required],
	      password: ['', Validators.required]
	    });


		}

  	 ngOnInit() {
  	}

  	loginUser(){
  		this.router.navigate(['/home']);
  	}

}
