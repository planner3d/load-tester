import {Routes} from "@angular/router";
export const TEST_PLAN_ROUTES: Routes = [
    {
        path: 'selected-scenery/:id',
        loadComponent: () => import('../selected-scenery/selected-scenery.component').then(mod => mod.SelectedSceneryComponent)
    },
    {
        path: '**',
        loadComponent: () =>
            import('../test-plan/ui/nothing-selected/nothing-selected.component').then(mod => mod.NothingSelectedComponent)
    }
]