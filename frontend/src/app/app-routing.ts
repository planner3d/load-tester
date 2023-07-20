import {Routes} from "@angular/router";
export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
    },
    {
        path: 'auth',
        loadComponent: () => import('../auth/auth.component')
            .then(mod => mod.AuthComponent),
        loadChildren: () => import('../auth/auth-routing')
            .then(mod => mod.AUTH_ROUTES)
    }
]