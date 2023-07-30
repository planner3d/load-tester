import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter} from "@angular/router";
import {APP_ROUTES} from "./app/app-routing";
import {provideAnimations} from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(APP_ROUTES),
        provideAnimations()
    ]
})
  .catch((err) => console.error(err));
