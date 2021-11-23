import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-login-register',
	templateUrl: './login-register.component.html',
	styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
	@Output() closeLogin = new EventEmitter<{closeLoginScreen: boolean}>();
	@Output() loggedInUser = new EventEmitter<{userName: string}>();

	today: number; //yyyy-mm-dd
	uName: string="";
	password: string="";
	error = [];
	loginError: boolean = false;
	loginErrMsg:string = "";
	registerSuccess: boolean = false;
	registerErr: boolean = false;
	
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
				this.loggedInUser.emit({
					userName: resData[0].u_name
				});

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

	register(registerUserObj: any){
		let data = {
			"username": registerUserObj.regUserName,
			"phone": registerUserObj.phone,
			"email": registerUserObj.email,
			"address": registerUserObj.address,
			"password": registerUserObj.regPass,
			"dob": registerUserObj.date
		}
		console.log(data)
		this.authService.signup(data).subscribe(
			resData => {
				this.registerSuccess = true;
				setTimeout(() => {this.registerSuccess = false;}, 5000);
			},
			errorMessage => {
				this.registerErr = true;
				this.loginErrMsg = errorMessage;
				setTimeout(() => {this.registerErr = false;}, 5000);
			}
			);
	}
	
	close():void{
		this.closeLogin.emit({
			closeLoginScreen: false
		});
	}

	ngOnInit(): void {
	}

}
