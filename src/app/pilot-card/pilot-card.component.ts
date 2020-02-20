import { Component, OnInit } from '@angular/core';
import { Airport } from '../airports/airport'
import { Pilot } from '../pilots/pilot';
import { Airplane } from '../airplanes/airplane';

import { Router } from '@angular/router';
import { AirportsService } from '../airports.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-pilot-card',
  templateUrl: './pilot-card.component.html',
  styleUrls: ['./pilot-card.component.sass']
})
export class PilotCardComponent implements OnInit {
  pilot: Pilot;
  airports: Airport;
  airplanes: Airplane;
  hidden:boolean;
  id:number;
  path: string;
  constructor(private airService: AirportsService, private ar:ActivatedRoute, private route:Router) { 
  }

  ngOnInit() {
    if(!this.pilot){
      this.path = this.ar.snapshot.paramMap.get("id");
      this.id = Number(this.path);
      this.airService.getPilotByID(this.id)
      .subscribe(pilot => this.pilot = pilot)    
    }  
    this.hidden = true;
  }
  getPlanesNames(ids:[]){ 
    if(!this.airplanes){
      this.airService.getPlanesNames(ids).subscribe(airplanes => this.airplanes = airplanes)
    }
  }
  getAirportsNames(ids:[]){ 
    if(!this.airports){
      this.airService.getAirportsNames(ids).subscribe(airports => this.airports = airports)
    }
  }
  passPlane(item:Airplane){
    this.airService.selectedAirplane = item;
    this.route.navigate(['/airplanes-list/airplane/' + item.id]);
  }
  passAirport(item:Airport){
    this.airService.selectedAirport = item;
    this.route.navigate(['/airports-list/airport/' + item.id]);
  }
  editCard(){
    this.hidden = false;
  }  
  saveCard(){
    this.hidden = true;
    this.airService.updatePilot(this.pilot)
    .subscribe();
  }

}
