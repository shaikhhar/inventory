import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const loadProducts = createAction(
  '[Inventory] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Inventory] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Inventory] Load Products Failure',
  props<{ error: string }>()
);

export const updateSearchTerm = createAction(
  '[Inventory] Update Search Term',
  props<{ searchTerm: string }>()
);

export const updateCategoryFilter = createAction(
  '[Inventory] Update Category Filter',
  props<{ category: string }>()
);


export const addProduct = createAction(
  '[Inventory] Add Product',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  '[Inventory] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailure = createAction(
  '[Inventory] Add Product Failure',
  props<{ error: string }>()
);
