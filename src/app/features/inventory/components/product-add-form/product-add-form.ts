import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product.model';
import * as InventoryActions from '../../store/inventory.actions';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { Layout } from '../../../../core/layout/layout';

@Component({
  selector: 'app-product-add-form',
  standalone: true,
  imports: [
    Layout,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    StoreModule
  ],
  templateUrl: './product-add-form.html',
  styleUrls: ['./product-add-form.scss']
})
export class ProductAddFormComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }
  onSubmit(): void {
    if (this.productForm.invalid) return;

    const product: Product = {
      id: null,
      ...this.productForm.value
    };

    console.log('products ', product)
    this.store.dispatch(InventoryActions.addProduct({ product }));
    this.router.navigate(['/inventory']);
    this.productForm.reset({ name: '', category: '', price: 0 });
  }
}
