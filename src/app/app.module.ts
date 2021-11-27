import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
//import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryComponent } from './components/user/inventory/inventory.component';
import {InventoryformService} from './services/inventoryform.service';
import {InventoryService} from './services/inventory.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { LoginRegisterComponent } from './shared/login-register/login-register.component';
import { UserActionsComponent } from './components/user/user-actions/user-actions.component';
import { CheckOrderComponent } from './components/user/check-order/check-order.component';
import { CustomerPurchaseComponent } from './components/admin/customer-purchase/customer-purchase.component';
import { AdminActionsComponent } from './components/admin/admin-actions/admin-actions.component';
import { CartDetailsComponent } from './components/user/cart-details/cart-details.component';

@NgModule({
  declarations: [
  AppComponent,
  NavComponent,
  HeaderComponent,
  HomeComponent,
  InventoryComponent,
  AddInventoryComponent,
  LoginRegisterComponent,
  UserActionsComponent,
  CheckOrderComponent,
  CustomerPurchaseComponent,
  AdminActionsComponent,
  CartDetailsComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  BrowserAnimationsModule,
  MatButtonModule,
  LayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule
  ],
  providers: [MessageService, InventoryformService, HttpErrorHandler, InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
