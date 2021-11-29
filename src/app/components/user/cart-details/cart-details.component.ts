import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {OrderService} from '../../../services/order.service';

type itemCounts = { rentPrice: number, depositPrice: number};
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
	totalRent: number = 0;
	totalDeposit: number = 0;
	items: {"item_id": number, "count": number}[] = [];
	myarray: itemCounts[] = [];
	priceListMap : Map<number, itemCounts[]> = new Map<number, itemCounts[]>();

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
					resData.forEach((element, index) => {
						this.wishlistArr[index].order_cnt = 1; 
						this.priceListMap.delete(element.item_id);
						if(!this.priceListMap.has(element.item_id)){
							this.myarray.push({rentPrice : element.rental_price , depositPrice :element.advance_amount});
							this.priceListMap.set(element.item_id, this.myarray); 
						}
						this.myarray = [];  
					} )
					
					this.updateMap();
				},
				errorMessage => {
					console.log(errorMessage);
				}
				);
		})
	}
	
	updateMap(){
		this.totalRent = 0;
		this.totalDeposit = 0;
		for (let [key, value] of this.priceListMap) {
			console.log(key, value);
			this.totalRent += value[0].rentPrice;
			this.totalDeposit += value[0].depositPrice;
		}
	}

	calculatePricePerItem(inputVal: number,index:number){
		let totalRe = inputVal*this.wishlistArr[index].rental_price;
		(document.getElementById('rent'+index) as HTMLInputElement).innerHTML = 
		`Total Rent: $${totalRe}`;

		let totalDepo = inputVal*this.wishlistArr[index].advance_amount;
		(document.getElementById('deposit'+index) as HTMLInputElement).innerHTML = 
		`Total Deposit: $${totalDepo}`;
		this.wishlistArr[index].order_cnt = inputVal;
		if(this.priceListMap.has(this.wishlistArr[index].item_id)){
			this.myarray.push({rentPrice : totalRe , depositPrice :totalDepo});
			this.priceListMap.set(this.wishlistArr[index].item_id, this.myarray); 
		}
		this.myarray = [];  
		this.updateMap();
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
	
	checkOut(){
		this.wishlistArr.forEach((element, index) => {
		let item = {
			"item_id": element.item_id,
			"count": element.order_cnt
		}
			this.items.push(item);
		})
		console.log(this.items)

		this.orderService.checkout(this.items).subscribe(
			resData => {
				console.log(resData);
				this.closeCart();
			},
			errorMessage => {
				console.log(errorMessage);
			}
		);
		this.items = [];
	}

	closeCart(){
		this.closeCartchild.emit({
			closeCartOverlay: false
		});
	}
}
