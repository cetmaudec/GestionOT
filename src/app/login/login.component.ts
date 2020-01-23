import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from'sweetalert2'
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	data = {username: '', password: ''};
  user: any;
  logIN: any;
  idUser: any;

  	constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient, private auth: AuthService ) { 
	  	this.loginForm = this.formBuilder.group({
	      username: ['', Validators.required],
	      password: ['', Validators.required]
	    });


		}

  	 ngOnInit() {
      console.log("Login Enter");
  	}

    async	loginUser(){
      console.log(this.loginForm.value.password);
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe( 
        result => this.router.navigate(['/home']),
        err => swal.fire('Usuario y/o Contraseña Incorrecta')
  
      );
    }
}
