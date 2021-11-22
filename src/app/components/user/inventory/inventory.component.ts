import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
	categoryArr: {"c_id": number, "c_name": string}[] = [];
	checkedCategory: number[] = [];

	pattern: string[] = ['Lehenga', 'Saree','Bridesmaid'];
	checkedPattern: string[] = [];

	color: string[] = ['Red', 'Yellow','Pink'];
	checkedColor: string[] = [];

	constructor(private inventoryService:InventoryService) { 

	}

	getItem(event: any, index: number) {
		if(event.target.checked) {
			this.checkedCategory.push(event.target.value);
		} else {
			let i = this.checkedCategory.indexOf(event.target.value);
			if (i > -1) {
				this.checkedCategory.splice(i, 1);
			}
		}
		console.log(this.checkedCategory)
	}

	getPattern(event: any){
		if(event.target.checked) {
			this.checkedPattern.push(event.target.value);
		} else {
			const index = this.checkedPattern.indexOf(event.target.value);
			if (index > -1) {
				this.checkedPattern.splice(index, 1);
			}
		}
		console.log(this.checkedPattern)	
	}

	getColor(event: any){
		if(event.target.checked) {
			this.checkedColor.push(event.target.value);
		} else {
			const index = this.checkedColor.indexOf(event.target.value);
			if (index > -1) {
				this.checkedColor.splice(index, 1);
			}
		}
	}

	getInventory(){
		this.inventoryService.getCategory().subscribe(
			resData => {
				this.categoryArr = resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			);
	}

	ngOnInit(): void {
		this.getInventory();
	}

}
