import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { InventoryService } from '../services/inventory.service';
import {
  loadProducts,
  addProduct,
  loadProductsSuccess,
  loadProductsFailure,
  addProductSuccess,
  addProductFailure
} from './inventory.actions';

@Injectable()
export class InventoryEffects {
  private actions$ = inject(Actions);
  private inventoryService = inject(InventoryService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.inventoryService.getProducts().pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(() =>
            of(loadProductsFailure({ error: 'Failed to load products' }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap(({ product }) =>
        this.inventoryService.addProduct(product).pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError(() =>
            of(addProductFailure({ error: 'Failed to add product' }))
          )
        )
      )
    )
  );
}
