import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import {InventoryformService} from './services/inventoryform.service';
import {InventoryService} from './services/inventory.service';

@NgModule({
  declarations: [
  AppComponent,
  HeaderComponent,
  HomeComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule
  ],
  providers: [MessageService, InventoryformService, HttpErrorHandler, InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
