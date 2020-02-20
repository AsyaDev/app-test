import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Airport } from './airports/airport';
import { Injectable } from '@angular/core';
import  AirportsData  from './jsons/airports.json';
import  AirplanesData  from './jsons/airplanes.json';
import  PilotsData  from './jsons/pilots.json'

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
     const airports: any = AirportsData;
     const planes: any = AirplanesData;
     const pilots: any = PilotsData;
     return {airports, planes, pilots};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

}