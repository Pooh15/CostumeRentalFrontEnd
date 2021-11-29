import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from '../../services/message.service';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	loginFlag: boolean = false;
	userName:string = "";
	count: number = 0;
	openCartFlag: boolean = false;

	constructor(private router:Router, private messageService: MessageService) { 

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
	
	closeCart(closeCart: {closeCartOverlay: boolean, orderPlaceSuccess: boolean}){
		this.openCartFlag = closeCart.closeCartOverlay;
		console.log('inside header')
		if(closeCart.orderPlaceSuccess == true){
			console.log(closeCart.orderPlaceSuccess)
		}
	}

	ngOnInit(): void {
		this.messageService.count.subscribe(c => {
			this.count = c;
		});
	}
}
