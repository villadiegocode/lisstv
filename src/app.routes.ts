import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { authGuard } from './app/pages/auth/guards/auth.guard';
import { publicGuard } from './app/pages/auth/guards/public.guard';
import { Register } from './app/pages/auth/register';
import { PlayingPageComponent } from './app/pages/peliculas/pages/playing-page/playing-page.component';
import { PopularPageComponent } from './app/pages/peliculas/pages/popular-page/popular-page.component';
import { PremieresPageComponent } from './app/pages/peliculas/pages/premieres-page/premieres-page.component';


export const appRoutes: Routes = [
    { path: 'auth',
        canActivate: [publicGuard],
        loadChildren: () => import('./app/pages/auth/auth.routes'),
        title: 'LissTV | Login',

    },
    {
        path: 'tendencias',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            { path: '', component: Dashboard, title: 'LissTv | Tedencias' },
            {path: 'en-cines', component: PlayingPageComponent, title: 'LissTv | En cines'},
            {path: 'populares', component: PopularPageComponent, title: 'LissTv | Populares'},
            {path: 'proximos-estrenos', component: PremieresPageComponent, title: 'LissTv | Próximos estrenos'},
        ]
    },

    { path: 'registro', component: Register, title: 'LissTV | Registro'},

    {
        path: '**',
        redirectTo: 'auth',
    },

];
