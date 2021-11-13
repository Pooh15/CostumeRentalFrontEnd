import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import {InventoryformService} from './services/inventoryform.service';

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
  providers: [InventoryformService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
