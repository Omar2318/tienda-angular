import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const user = await authService.getCurrentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
