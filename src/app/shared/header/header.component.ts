import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	loginFlag: boolean = false;
	userName:string = "";

	constructor(private router:Router) { 

	}
	loginOpenClose(closeLogin: {closeLoginScreen: boolean}){
		this.loginFlag = closeLogin.closeLoginScreen;
	}

	//Update Username to header
	updateUserName(user: {userName: string}){
		this.userName = user.userName;
		this.loginFlag = false;
	}

	//Update User Profile
	updateProfile(){

	}

	signOut(){
		sessionStorage.clear();
		this.userName = '';
		this.router.navigate(['home']);
	}
	ngOnInit(): void { }
}
