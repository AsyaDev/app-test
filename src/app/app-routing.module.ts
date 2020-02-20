import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AirportsComponent } from './airports/airports.component'
import { AirplaneCardComponent } from './airplane-card/airplane-card.component';
import { AirportCardComponent } from './airport-card/airport-card.component';
import { PilotCardComponent } from './pilot-card/pilot-card.component';
import { PilotsComponent } from './pilots/pilots.component'
import { AirplanesComponent } from './airplanes/airplanes.component'



const routes: Routes = [
  { path: '', redirectTo: 'airports-list', pathMatch: 'full' },
  { path: 'airports-list', component:  AirportsComponent},
  { path: 'pilots-list', component:  PilotsComponent},
  { path: 'airplanes-list', component: AirplanesComponent},
  { path: 'airports-list/airport/:id', component: AirportCardComponent },
  { path: 'airplanes-list/airplane/:id', component: AirplaneCardComponent },
  { path: 'pilots-list/pilot/:id', component: PilotCardComponent }
];
export const appRouting = RouterModule.forRoot(routes);
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }