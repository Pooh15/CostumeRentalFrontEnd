import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {InventoryformService} from '../../services/inventoryform.service';
import {InventoryService} from '../../services/inventory.service';

@Component({
	selector: 'app-add-inventory',
	templateUrl: './add-inventory.component.html',
	styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
	myFiles:string [] = [];
	originalCost: number = 0;
	rental_cost:number = 0;
	deposite_cost:number = 0;
	imageUrl: any = '';
	selectedCat: string = 'Select Category';
	selectedPattern: string = 'Select Pattern';
	selectedSize: string = 'Select Size';
	selectedMaterial: string = 'Select Material';
	selectedColor: string = 'Select Color';
	errorMessage: string = '';
	categoryName: string = '';
	catClicked: boolean = false;
	successMsg: string = '';
	addPatternBtn: boolean = false;
	newPattern: string = '';

	categoryArr: {"c_id": number, "c_name": string}[] = [];
	
	pattern: {"p_id": number, "c_id": number,"p_name": string}[] = [];

	color: {"color_id": number, "color": string}[] = [];

	size: {"s_id": number, "s_name": string}[] = [];

	cloth: {"cloth_id": number, "material_name": string}[] = [];

	constructor(private inventoryformService: InventoryformService,
		private inventoryService: InventoryService) { }

onSubmit(form: NgForm){
	const frmdata = new FormData();
	let file: any=null;
	for (var i = 0; i < this.myFiles.length; i++) { 
		file = this.myFiles[i];
	}
	console.log(form);
	frmdata.append("imageName", file);
	frmdata.append("inventoryObj",JSON.stringify(form));

	this.inventoryformService.createInventory(frmdata).subscribe(data => {
		console.log(data);
		this.successMsg = 'Inventory Added Successfully!';
		setTimeout(() => {this.successMsg = ''}, 6000);
	},
	errorMessage => {
		this.errorMessage = errorMessage;
		setTimeout(() => {this.errorMessage = ''}, 5000);
	});

}


onFileSelected(event: any){
	if (event.target.files[0].size > 2000000) {
		console.log('Image Size Cannot Exceed 2Mb Upload Failure');
		return;
	}
	this.myFiles = event.target.files;

	var reader = new FileReader();
	reader.readAsDataURL(event.target.files[0]); 
	reader.onload = (_event) => { 
		this.imageUrl = reader.result; 
	}

}

getRentAndDeposit(){
	console.log(this.originalCost);
	if(this.originalCost > 500){
		this.rental_cost = this.originalCost * 0.3;
		this.deposite_cost = this.originalCost * 0.8;
	} else {
		this.rental_cost = this.originalCost * 0.25;
		this.deposite_cost = this.originalCost * 0.8;
	}
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
}
getPattern(){
	this.inventoryService.getPattern().subscribe(
		resData => {
			this.pattern = resData;
		},
		errorMessage => {
			console.log(errorMessage);
		}
		);
}

getColor(){
	this.inventoryService.getColor().subscribe(
		resData => {
			this.color = resData;
		},
		errorMessage => {
			console.log(errorMessage);
		}
		);
}

getSize(){
	this.inventoryService.getSize().subscribe(
		resData => {
			this.size = resData;
		},
		errorMessage => {
			console.log(errorMessage);
		}
		); 
}
getCloth(){
	this.inventoryService.getCloth().subscribe(
		resData => {
			this.cloth = resData;
		},
		errorMessage => {
			console.log(errorMessage);
		}
		); 
}


addCat(){
	console.log(this.categoryName)

	this.inventoryformService.createCategory({"categoryName":this.categoryName})
	.subscribe(data => {
		this.successMsg = 'Category addition Success!';
		this.getCategory();

		setTimeout(() => {this.successMsg = ''}, 5000);
		this.catClicked = !this.catClicked;
	},
	errorMessage => {
		this.errorMessage = errorMessage;
		setTimeout(() => {this.errorMessage = ''}, 5000);
	});
}

addPattern(){
	
console.log(this.newPattern+ "  "+ this.selectedCat)
	this.inventoryformService.addPattern(this.newPattern, parseInt(this.selectedCat))
	.subscribe(data => {
		this.successMsg = 'Pattern addition Success!';
		this.getPattern();

		setTimeout(() => {this.successMsg = ''}, 5000);
		this.addPatternBtn = !this.addPatternBtn;
	},
	errorMessage => {
		this.errorMessage = errorMessage;
		setTimeout(() => {this.errorMessage = ''}, 5000);
	});
}

ngOnInit(): void {
	this.getCategory();
	this.getPattern();
	this.getColor();
	this.getCloth();
	this.getSize();
}

}
