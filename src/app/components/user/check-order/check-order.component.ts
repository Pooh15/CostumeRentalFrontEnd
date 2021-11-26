import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
	selector: 'app-check-order',
	templateUrl: './check-order.component.html',
	styleUrls: ['./check-order.component.css']
})
export class CheckOrderComponent implements OnInit {
	orderList: any[] = [];
	constructor(private orderService: OrderService) { }

	getUserOrders(){
		this.orderService.getOrders().subscribe(data => {
			this.orderList = data;
			console.log(data);
		},
		errorMessage => {
			console.log(errorMessage)
		});
	}

	ngOnInit(): void {
		this.getUserOrders();
	}

}
