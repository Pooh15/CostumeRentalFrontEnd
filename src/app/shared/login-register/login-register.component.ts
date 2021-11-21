import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-login-register',
	templateUrl: './login-register.component.html',
	styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
	//registrationForm: FormGroup;
	today: number; //yyyy-mm-dd
	uName: string="";
	password: string="";
	error = [];
	loginError: boolean = false;
	loginErrMsg:string = "";

	constructor(private authService: AuthService, private router:Router) {
		this.today = Date.now();
	}

	login(){
		this.authService.login({username: this.uName, password: this.password}).subscribe(
			resData => {
				
				window.sessionStorage.setItem("address", resData[0].address);
				window.sessionStorage.setItem("u_name", resData[0].u_name);
				window.sessionStorage.setItem("role_name", resData[0].role_name);
				window.sessionStorage.setItem("dob", resData[0].dob);
				window.sessionStorage.setItem("phone", resData[0].phone.toString());
				window.sessionStorage.setItem("email", resData[0].email);

				this.loginError = false;
				this.router.navigate(['user']);
				if(resData[0].u_name === "User"){
					this.router.navigate(['user']);
				} else{
					//this.router.navigate(['admin']);
				}
			},
			errorMessage => {
				this.loginError = true;
				this.loginErrMsg = errorMessage;
				setTimeout(() => {this.loginError = false;}, 5000);
			}
			);

	}

	register(){
		/*..InitiLize list of value from thr form..*/
		let data = {
			// "username": this.registrationForm.value.username,
			// "phone": this.registrationForm.value.fname,
			// "email": this.registrationForm.value.lastName,
			// "address": this.registrationForm.value.email,
			// "password": this.registrationForm.value.password,
			// "dob": this.roleValue
		}
		this.authService.signup(data).subscribe(
			resData => {
				console.log(resData);
			},
			errorMessage => {
				this.loginError = true;
				this.loginErrMsg = errorMessage;
				setTimeout(() => {this.loginError = false;}, 5000);
			}
			);
	}

	ngOnInit(): void {
	}

}
