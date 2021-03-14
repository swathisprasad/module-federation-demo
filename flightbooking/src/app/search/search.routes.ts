import { Routes } from '@angular/router';
import { FlightComponent } from './flight/flight.component';

export const FLIGHTS_ROUTES: Routes = [
    {
        path: 'search',
        component: FlightComponent
    }
];