import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FLIGHTS_ROUTES } from './search.routes';
import { FlightComponent } from './flight/flight.component';
import { LazyComponent } from './lazy/lazy.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FLIGHTS_ROUTES)
    ],
    declarations: [
        FlightComponent,
        LazyComponent
    ]
})
export class SearchModule { }