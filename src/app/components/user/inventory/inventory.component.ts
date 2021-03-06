import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import {MessageService} from '../../../services/message.service';
import { InventoryformService } from 'src/app/services/inventoryform.service'; 

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
	
	keyword: string='';

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

	inventory: any[] = [];
	openCartFlag: boolean = false;

	successAlert: boolean = false;

	successMsg: string = '';
	errorMessage: string = '';

	constructor(private inventoryService:InventoryService,private inventoryformService: InventoryformService,
		private messageService: MessageService) { 
	}
	
	closeCart(closeCart: {closeCartOverlay: boolean, orderPlaceSuccess: boolean}){
    this.openCartFlag = closeCart.closeCartOverlay;
    console.log(closeCart.orderPlaceSuccess)
    if(closeCart.orderPlaceSuccess == true){
    	this.successAlert = true;
    	setTimeout(() => {this.successAlert = false}, 5000);
    }
  }

	addCart(itemId: number, element: any){
		if(element.textContent == 'Go To Cart'){
			this.openCartFlag = true;
		} else {	
			element.textContent = 'Go To Cart';
			this.messageService.nextCount(itemId);
		}
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
				this.inventory=resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			);
			if(this.checkedCategory.length==0)
			{
				this.getInventory();
			}
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
		this.inventoryService.getPatternDetails(this.checkedPattern).subscribe(
			resData => {
				this.inventory=resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			);
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
		this.inventoryService.getColorDetails(this.checkedColor).subscribe(
			resData => {
				this.inventory=resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			);
			if(this.checkedColor.length==0)
			{
				this.getInventory();
			}
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
		this.inventoryService.getSizeDetails(this.checkedSize).subscribe(
			resData => {
				this.inventory=resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			);

			if(this.checkedSize.length==0)
			{
				this.getInventory();
			}
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
		this.inventoryService.getClothDetails(this.checkedCloth).subscribe(
			resData => {
				this.inventory=resData;
			},
			errorMessage => {
				console.log(errorMessage);
			}
			);
	}

	getInventory(){
		this.inventoryService.getItems().subscribe(data => {
			console.log(data);
			this.inventory = data;
		});
	}

	getCategory(){
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


	keywordSearch(){
		console.log(this.keyword);
		    this.inventoryformService.keywordSearch(this.keyword)
            .subscribe(data => {
				
              this.successMsg = 'Search result completed!';
             },
            errorMessage => {
              this.errorMessage = errorMessage;
              setTimeout(() => {this.errorMessage = ''}, 5000);
            });


	}
	ngOnInit(): void {
		this.getInventory();
		this.getCategory();
	}

}
