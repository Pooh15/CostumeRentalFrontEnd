import { Component, OnInit } from '@angular/core';
import {InventoryService} from 'src/app/services/inventory.service';

@Component({
  selector: 'app-customer-purchase',
  templateUrl: './customer-purchase.component.html',
  styleUrls: ['./customer-purchase.component.css']
})
export class CustomerPurchaseComponent implements OnInit {

  orderItems: any[] = [];
  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.getOrderDetails().subscribe(data => {
      console.log(data);
      this.orderItems = data;
    });
  }

}