import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  { path: 'list',
    loadComponent: () => import('./containers/inventory').then(m => m.Inventory),
    providers: [
      provideState('inventory', inventoryReducer),
      provideEffects([InventoryEffects])
    ]
  }, {
    path: 'add',
    loadComponent: () => import('./components/product-add-form/product-add-form').then(m => m.ProductAddFormComponent) 
  }
]

import { RouterModule } from '@angular/router';
import { provideState } from '@ngrx/store';
import { inventoryReducer } from './store/inventory.reducer';
import { provideEffects } from '@ngrx/effects';
import { InventoryEffects } from './store/inventory.effects';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InventoryModule { }
