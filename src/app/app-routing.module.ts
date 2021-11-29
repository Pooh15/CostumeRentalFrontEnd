import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import {HomeComponent} from './home/home.component';
import {AddInventoryComponent} from './components/add-inventory/add-inventory.component';
import {LoginRegisterComponent} from './shared/login-register/login-register.component';
import {UserActionsComponent} from './components/user/user-actions/user-actions.component';
import {CheckOrderComponent} from './components/user/check-order/check-order.component';
import {InventoryComponent} from './components/user/inventory/inventory.component';
import  {CustomerPurchaseComponent} from './components/admin/customer-purchase/customer-purchase.component';
import  {AdminActionsComponent} from './components/admin/admin-actions/admin-actions.component';
import { ReportComponent } from './components/admin/report/report.component';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{
	path: 'user',
	component: UserActionsComponent,
	children: [
	{ path: '', redirectTo: 'inventory', pathMatch: 'full'},
	{ path: 'check-order', component: CheckOrderComponent },
	{ path: 'inventory', component: InventoryComponent },
	]
},
{path: 'admin', component: AdminActionsComponent,
children:[
	{ path: '', redirectTo: 'customer-orders', pathMatch: 'full'},
	{ path: 'customer-orders', component: CustomerPurchaseComponent },
	{path: 'add-inventory', component: AddInventoryComponent},
	{path: 'report', component: ReportComponent}
]}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
