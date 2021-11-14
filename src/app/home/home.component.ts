import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../services/inventory.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

rentItems: any[] = [];

constructor(private inventoryService: InventoryService) { }

ngOnInit(): void {
	this.inventoryService.getItems().subscribe(data => {
		console.log(data);
		this.rentItems = data;
	});
}

}
