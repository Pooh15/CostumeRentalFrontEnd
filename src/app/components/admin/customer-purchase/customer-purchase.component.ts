import { Component, OnInit } from '@angular/core';
import {InventoryService} from 'src/app/services/inventory.service';
import { InventoryformService } from 'src/app/services/inventoryform.service';


interface ResponseData {
	Success: [
	"Successfully Added."
	]
}
@Component({
  selector: 'app-customer-purchase',
  templateUrl: './customer-purchase.component.html',
  styleUrls: ['./customer-purchase.component.css']
})

export class CustomerPurchaseComponent implements OnInit {

  actual_return_count: number=0;
  successMsg: string = '';
  errorMessage: string='';

  orderItems: any[] = [];

  btnVal = "Return";
  //button click function
  changeText()
        {
          this.btnVal = "Returned!!"
        }
  

  constructor(private inventoryService: InventoryService,private inventoryformService: InventoryformService) { }

  returnOrder(order_id:number,item_id:number){
    this.inventoryformService.returnOrder(order_id,item_id,this.actual_return_count)
    .subscribe(data => {
      this.successMsg = 'Item added to Laundry!';
     },
    errorMessage => {
      this.errorMessage = errorMessage;
      setTimeout(() => {this.errorMessage = ''}, 5000);
    });

  }
  

  ngOnInit(): void {
    this.inventoryService.getAdminOrderDetails().subscribe(data => {
      console.log(data);
      this.orderItems = data;
    });

  }

}