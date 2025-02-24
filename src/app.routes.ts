import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { authGuard } from './app/pages/auth/guards/auth.guard';


export const appRoutes: Routes = [
    { path: 'auth',
        loadChildren: () => import('./app/pages/auth/auth.routes'),
        title: 'LessTV | Login',

    },
    {
        path: 'peliculas',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            { path: '', component: Dashboard },
        ]
    },

    {
        path: '**',
        redirectTo: 'auth',
    },

];
