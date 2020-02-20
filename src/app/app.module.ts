import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from "@angular/material";
import {DemoMaterialModule} from './material-module';
import {CourseDialogComponent} from './course-dialog/course-dialog.component'
import { AirportsComponent } from './airports/airports.component';
import { PilotsComponent } from './pilots/pilots.component';
import { AirplanesComponent } from './airplanes/airplanes.component';
import { AirportCardComponent } from './airport-card/airport-card.component';
import { PilotCardComponent } from './pilot-card/pilot-card.component';
import { AirplaneCardComponent } from './airplane-card/airplane-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AirportsComponent,
    PilotsComponent,
    AirplanesComponent,
    AirportCardComponent,
    PilotCardComponent,
    AirplaneCardComponent,
    CourseDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDialogModule,
    DemoMaterialModule,
    NgxPaginationModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
