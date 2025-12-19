import { Product } from "../models/product.model";

export interface InventoryState {
        products: Product[];
        searchTerm: string;
        category: string;
        loading: boolean;
        error?: string;
    }  

export const initialInventoryState: InventoryState = {
    products: [],
    searchTerm: '',
    category: 'All',
    loading: false,
    error: undefined
};