import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { Register } from './register';

export default [
    { path: 'login', component: Login },
    { path: 'denegado', component: Access, title: 'LessTV | Denegado' },
    { path: 'error', component: Error, title: 'LessTV | Registro' },
    { path: '**', redirectTo: 'login'  }

] as Routes;
