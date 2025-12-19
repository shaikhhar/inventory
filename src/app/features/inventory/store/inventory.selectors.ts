import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InventoryState } from './inventory.state';

export const selectInventoryState =
  createFeatureSelector<InventoryState>('inventory');

export const selectProducts = createSelector(
  selectInventoryState,
  (state) => state.products
);

export const selectSearchTerm = createSelector(
  selectInventoryState,
  (state) => state.searchTerm
);

export const selectCategory = createSelector(
  selectInventoryState,
  (state) => state.category
);

export const selectLoading = createSelector(
  selectInventoryState,
  (state) => state.loading
);

export const selectFilteredProducts = createSelector(
  selectProducts,
  selectSearchTerm,
  selectCategory,
  (products, searchTerm, category) =>
    products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === 'All' || product.category === category;

      return matchesSearch && matchesCategory;
    })
);
