import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {InventoryformService} from './services/inventoryform.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'RentACostume';
	myFiles:string [] = [];
	fname: string="";

	constructor(private inventoryformService: InventoryformService){}

	onSubmit(form: NgForm){
		const frmdata = new FormData();
		let file: any=null;
		for (var i = 0; i < this.myFiles.length; i++) { 
			file = this.myFiles[i];
		}
		
		frmdata.append('fname', this.fname);
		frmdata.append("imageName", file);

		console.log(this.myFiles);
		this.inventoryformService.createInventory(frmdata).subscribe(data => {
			console.log(data);
		});
	}

	onFileSelected(event: any){
		this.myFiles = event.target.files;
	}
}
