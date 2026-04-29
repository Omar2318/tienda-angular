import { Injectable } from '@angular/core';
import { Product } from '../home/interfaces/product.interface';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.urlApi, environment.apiKey);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
}
