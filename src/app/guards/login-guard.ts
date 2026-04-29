import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Auth } from '../services/auth';

export const LoginGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const authService = inject(Auth);

  const user = await authService.getCurrentUser();

  if (user) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
