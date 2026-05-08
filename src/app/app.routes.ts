import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { authGuard } from './guards/auth-guard';
import { LoginGuard } from './guards/login-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    //canActivate: [LoginGuard],
  },
  {
    path: 'home',
    component: Home,
    //canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
