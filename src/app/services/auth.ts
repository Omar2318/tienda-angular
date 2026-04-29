import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Supabase } from './supabase';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private supabase = inject(Supabase);

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Error signing in: ', error);
      return null;
    }

    console.log('User signed: ', data.user);

    localStorage.setItem('user', JSON.stringify(data.user));

    return data.user;
  }

  async getCurrentUser() {
    const {
      data: { session },
      error,
    } = await this.supabase.client.auth.getSession();

    if (error) {
      console.log('Error al obtener la sesión: ', error);
      return null;
    }

    return session?.user ?? null;
  }
}
