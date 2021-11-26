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
	fname: string="";
	lname: string="";
	originalCost: number = 0;
	rental_cost:number = 0;
	deposite_cost:number = 0;
	imageUrl: any = '';

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
		// frmdata.append("imageName", file);

		// this.inventoryformService.createInventory(frmdata).subscribe(data => {
			// 	console.log(data);
			// });
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
				this.deposite_cost = this.originalCost * 0.6;
			} else {
				this.rental_cost = this.originalCost * 0.25;
				this.deposite_cost = this.originalCost * 0.5;
			}
		}

		getTypesForNewInventory(){
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
			this.getTypesForNewInventory()
		}

	}
