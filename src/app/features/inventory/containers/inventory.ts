import { Component, inject, OnInit } from '@angular/core';
import { Layout } from '../../../core/layout/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { loadProducts, updateSearchTerm, updateCategoryFilter } from '../store/inventory.actions';

import { selectFilteredProducts, selectLoading } from '../store/inventory.selectors';
import { debounceTime, distinctUntilChanged, } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { selectSearchTerm, selectCategory } from '../store/inventory.selectors';
import { startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    Layout,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,

  ],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.scss'],
})
export class Inventory implements OnInit {
  private store = inject(Store);

  products$ = this.store.select(selectFilteredProducts);
  loading$ = this.store.select(selectLoading);

  searchControl = new FormControl('');
  categoryControl = new FormControl('');

  ngOnInit(): void {
    this.store.dispatch(loadProducts());

    this.store.select(selectSearchTerm).pipe(startWith('')).subscribe(value => {
      this.searchControl.setValue(value, { emitEvent: false });
    });

    this.store.select(selectCategory).pipe(startWith('All')).subscribe(value => {
      this.categoryControl.setValue(value, { emitEvent: false });
    });

    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(this.searchControl.value),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.categoryControl.valueChanges.pipe(
        startWith(this.categoryControl.value),
        distinctUntilChanged()
      )
    ]).subscribe(([searchTerm, category]) => {
      this.store.dispatch(updateSearchTerm({ searchTerm: searchTerm ?? '' }));
      this.store.dispatch(updateCategoryFilter({ category: category ?? '' }));
    });
  }

  trackById(index: number, item: Product): number {
    return item.id;
  }
}
