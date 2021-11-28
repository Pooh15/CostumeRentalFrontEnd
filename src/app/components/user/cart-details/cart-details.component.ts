import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {OrderService} from '../../../services/order.service';

@Component({
	selector: 'app-cart-details',
	templateUrl: './cart-details.component.html',
	styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
	@Input('showCart') showCart: boolean = false;
	@Output() closeCartchild = new EventEmitter<{closeCartOverlay: boolean}>();
	count: number = 0;
	wishlistArr: any[] = [];
	cntToBeTaken: number = 1;
	
	constructor(private messageService: MessageService, private orderService: OrderService) { }

	ngOnInit(): void {
		this.messageService.count.subscribe(c => {
			this.count = c;
		});
		this.messageService.cartItemArr.subscribe(itemArr =>{
			console.log(itemArr);
			
			this.orderService.getWishList(itemArr).subscribe(
				resData => {
					this.wishlistArr = resData;
				},
				errorMessage => {
					console.log(errorMessage);
				}
				);
		})
	}

	calculatePricePerItem(inputVal: number,index:number){
		let total = inputVal*this.wishlistArr[index].rental_price;
		(document.getElementById('rent'+index) as HTMLInputElement).innerHTML = 
		`Total Rent: $${total}`;

		total = inputVal*this.wishlistArr[index].advance_amount;
		(document.getElementById('deposit'+index) as HTMLInputElement).innerHTML = 
		`Total Deposit: $${total}`;

	}

	addCount(index: number, countInStore: number){
		let inputElement  = document.getElementById('cnt'+index) as HTMLInputElement;
		let inputVal = parseInt(inputElement.value);
		if(inputVal  < countInStore){
			inputVal++;
		}
		
		this.calculatePricePerItem(inputVal, index);
		(document.getElementById('cnt'+index) as HTMLInputElement).value = inputVal+'';
	}
	
	decreaseCount(index: number, countInStore:number){
		let inputElement = document.getElementById('cnt'+index) as HTMLInputElement;
		let inputVal = parseInt(inputElement.value);
		if(inputVal  > 0){
			inputVal--;
		}
		this.calculatePricePerItem(inputVal, index);
		
		(document.getElementById('cnt'+index) as HTMLInputElement).value = inputVal+'';
	}	

	closeCart(){
		this.closeCartchild.emit({
			closeCartOverlay: false
		});
	}
}
