import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Product } from './interfaces/product.interface';
import { Supabase } from '../services/supabase';
import { Products } from '../services/products';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  products = signal<Product[]>([]);
  private productsService = inject(Products);

  constructor() {
    this.load();
  }

  async load() {
    const data = await this.productsService.getProducts();
    if (!data) return console.log('Error');
    this.products.set(data);
  }
}
