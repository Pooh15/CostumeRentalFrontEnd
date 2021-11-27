import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-cart-details',
	templateUrl: './cart-details.component.html',
	styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
	@Input('showCart') showCart: boolean = false;
	@Output() closeCartchild = new EventEmitter<{closeCartOverlay: boolean}>();

	constructor() { }

	ngOnInit(): void {
	}

	closeCart(){
		this.closeCartchild.emit({
			closeCartOverlay: false
		});
	}
}
