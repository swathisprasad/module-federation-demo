import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const APP_ROUTES: Routes = [
    { path: '', component: MainComponent, pathMatch: 'full' }
];