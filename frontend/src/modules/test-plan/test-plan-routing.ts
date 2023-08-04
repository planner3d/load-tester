import {Routes} from "@angular/router";
import {SelectedSceneryComponent} from "../selected-scenery/selected-scenery.component";
export const TEST_PLAN_ROUTES: Routes = [
    {
        path: 'selected-scenery/:id',
        loadComponent: () => import('../selected-scenery/selected-scenery.component').then(mod => mod.SelectedSceneryComponent)
    },
]