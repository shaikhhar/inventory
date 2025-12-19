import { createReducer, on } from '@ngrx/store';
import * as InventoryActions from './inventory.actions';
import { initialInventoryState } from './inventory.state';

export const inventoryReducer = createReducer(
  initialInventoryState,

  on(InventoryActions.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),

  on(InventoryActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  on(InventoryActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(InventoryActions.updateSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),

  on(InventoryActions.updateCategoryFilter, (state, { category }) => ({
    ...state,
    category,
  })),

  on(InventoryActions.addProduct, (state) => ({
    ...state,
    loading: true,
  })),

);
