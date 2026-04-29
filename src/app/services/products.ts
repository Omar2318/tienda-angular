import { inject, Injectable } from '@angular/core';
import { Supabase } from './supabase';
import { Product } from '../home/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private supabase = inject(Supabase);

  async getProducts(): Promise<Product[] | null> {
    const { data, error } = await this.supabase.client.from('Product').select('*');

    if (error) return null;
    return data;
  }
}
