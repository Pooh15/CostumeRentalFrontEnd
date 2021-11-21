import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {InventoryformService} from '../../services/inventoryform.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
	myFiles:string [] = [];
	fname: string="";
	lname: string="";
  constructor(private inventoryformService: InventoryformService) { }
onSubmit(form: NgForm){
		const frmdata = new FormData();
		let file: any=null;
		for (var i = 0; i < this.myFiles.length; i++) { 
			file = this.myFiles[i];
		}

		frmdata.append('fname', this.fname);
		frmdata.append('lname', this.lname);
		frmdata.append("imageName", file);

		this.inventoryformService.createInventory(frmdata).subscribe(data => {
			console.log(data);
		});
	}

	onFileSelected(event: any){
		if (event.target.files[0].size > 2000000) {
			console.log('Image Size Cannot Exceed 2Mb Upload Failure');
			return;
		}

		this.myFiles = event.target.files;
	}
  ngOnInit(): void {
  }

}