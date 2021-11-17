import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './browse/inventory/inventory.component';

const routes: Routes = [
  { path: 'browse/inventory', component: InventoryComponent },
  { path: 'pattern', component: InventoryComponent },
  { path: 'clothmaterial', component: InventoryComponent },
  { path: 'size', component: InventoryComponent },
  { path: 'color', component: InventoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
