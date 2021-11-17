import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import {HomeComponent} from './home/home.component';
import {AddInventoryComponent} from './components/add-inventory/add-inventory.component';
import {InventoryComponent} from './components/inventory/inventory.component';


const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{path: 'add-inventory', component: AddInventoryComponent},
{
	path: 'inventory',
	component: NavComponent,
	children: [
	{ path: '', redirectTo: 'pattern', pathMatch: 'full'},
	{ path: 'pattern', component: InventoryComponent },
	{ path: 'clothmaterial', component: InventoryComponent },
	{ path: 'size', component: InventoryComponent },
	{ path: 'color', component: InventoryComponent }
	]
},

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
