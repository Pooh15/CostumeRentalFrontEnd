import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import {HomeComponent} from './home/home.component';
import {AddInventoryComponent} from './components/add-inventory/add-inventory.component';
//import {InventoryComponent} from './components/inventory/inventory.component';
import {LoginRegisterComponent} from './shared/login-register/login-register.component';
import {UserActionsComponent} from './components/user/user-actions/user-actions.component';
import {CheckOrderComponent} from './components/user/check-order/check-order.component';
import {InventoryComponent} from './components/user/inventory/inventory.component';


const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{path: 'add-inventory', component: AddInventoryComponent},
{
	path: 'user',
	component: UserActionsComponent,
	children: [
	{ path: '', redirectTo: 'inventory', pathMatch: 'full'},
	{ path: 'check-order', component: CheckOrderComponent },
	{ path: 'inventory', component: InventoryComponent },
	]
}
// ,
// {
// 	path: 'inventory',
// 	component: NavComponent,
// 	children: [
// 	{ path: '', redirectTo: 'pattern', pathMatch: 'full'},
// 	{ path: 'pattern', component: InventoryComponent },
// 	{ path: 'clothmaterial', component: InventoryComponent },
// 	{ path: 'size', component: InventoryComponent },
// 	{ path: 'color', component: InventoryComponent }
// 	]
// }

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
