import {Routes} from "@angular/router";
import {TestPlanComponent} from "../modules/test-plan/test-plan.component";
import {TEST_PLAN_ROUTES} from "../modules/test-plan/test-plan-routing";
export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'test-plan',
    },
    {
        path: 'test-plan',
        loadComponent: () => import('../modules/test-plan/test-plan.component').then(mod => mod.TestPlanComponent),
        loadChildren: () => import('../modules/test-plan/test-plan-routing').then(mod => mod.TEST_PLAN_ROUTES),
    }
]