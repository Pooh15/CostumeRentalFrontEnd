import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../../services/inventory.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{
    /** Based on the screen size, switch from standard to one column per row */
    cards: any[] = [];

constructor(private inventoryService: InventoryService) { }

ngOnInit(): void {
	this.inventoryService.getItems().subscribe(data => {
		console.log(data);
		this.cards = data;
	});
}
  }