import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  private products = [
      { id: 1, name: 'Laptop', category: 'Electronics', price: 1200 },
      { id: 2, name: 'T-Shirt', category: 'Clothing', price: 30 },
      { id: 3, name: 'Phone', category: 'Electronics', price: 999 },
    ]
  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(1000));
  }

  addProduct(product: Product): Observable<Product[]> {
    const newProduct = { ...product, id: this.products.length + 1 };
    const updatedProducts = [...this.products, newProduct];
    this.products = updatedProducts;
    return of(updatedProducts).pipe(delay(1500));
  }
}
