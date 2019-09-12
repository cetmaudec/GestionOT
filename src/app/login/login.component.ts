import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

  	constructor(public formBuilder: FormBuilder, private router: Router) { 
	  	this.loginForm = this.formBuilder.group({
	      email: ['', Validators.required],
	      password: ['', Validators.required]
	    });
		}

  	ngOnInit() {
  	}


	loginUser(){
		this.router.navigate(['/home']);
	}

}
