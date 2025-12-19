import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
        title: 'Inventory Management'
    },
    {
        path: 'products',
        loadChildren: () => import('./features/inventory/inventory-module').then(m => m.routes)
    }, 
    {
        path: '**',
        redirectTo: 'products'
    }
];
