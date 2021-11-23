import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
	categoryList : any[]=[];
	categoryArr: {"c_id": number, "c_name": string}[] = [];
	checkedCategory: number[] = [];

	pattern: {"p_id": number, "c_id": number,"p_name": string}[] = [];
	checkedPattern: number[] = [];

	color: {"color_id": number, "color": string}[] = [];
	checkedColor: string[] = [];

	size: {"s_id": number, "s_name": string}[] = [];
	checkedSize: string[] = [];

	cloth: {"cloth_id": number, "material_name": string}[] = [];
	checkedCloth: string[] = [];

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

		this.inventoryService.getCategoryDetails(this.checkedCategory).subscribe(
			resData => {
				this.categoryList=resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			);
	}

	getPattern(event: any){
		if(event.target.checked) {
			this.checkedPattern.push(event.target.value);
		} else {
			let index = this.checkedPattern.indexOf(event.target.value);
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
		console.log(this.checkedColor)
	}

	getSize(event: any){
		if(event.target.checked) {
			this.checkedSize.push(event.target.value);
		} else {
			const index = this.checkedSize.indexOf(event.target.value);
			if (index > -1) {
				this.checkedSize.splice(index, 1);
			}
		}
		console.log(this.checkedSize)
	}

	getCloth(event: any){
		if(event.target.checked) {
			this.checkedCloth.push(event.target.value);
		} else {
			const index = this.checkedCloth.indexOf(event.target.value);
			if (index > -1) {
				this.checkedCloth.splice(index, 1);
			}
		}
		console.log(this.checkedCloth)
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

		this.inventoryService.getPattern().subscribe(
			resData => {
				this.pattern = resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			);
		this.inventoryService.getColor().subscribe(
			resData => {
				this.color = resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			);
		this.inventoryService.getSize().subscribe(
			resData => {
				this.size = resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			); 
		this.inventoryService.getCloth().subscribe(
			resData => {
				this.cloth = resData;
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
