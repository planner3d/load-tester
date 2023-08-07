import {Routes} from "@angular/router";
export const TEST_PLAN_ROUTES: Routes = [
    {
        path: 'selected-scenario/:id',
        loadComponent: () => import('../selected-scenario/selected-scenario.component').then(mod => mod.SelectedScenarioComponent)
    },
    {
        path: '**',
        loadComponent: () =>
            import('../test-plan/ui/nothing-selected/nothing-selected.component').then(mod => mod.NothingSelectedComponent)
    }
]