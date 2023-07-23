import {Routes} from "@angular/router";
import {TestPlanComponent} from "../modules/test-plan/test-plan.component";
export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'test-plan'
    },
    {
        path: 'test-plan',
        loadComponent: () => import('../modules/test-plan/test-plan.component').then(mod => mod.TestPlanComponent)
    }
]