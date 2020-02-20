import { Component, OnInit } from '@angular/core';
import { Airport } from '../airports/airport'
import { Pilot } from '../pilots/pilot';
import { Airplane } from '../airplanes/airplane';

import { Router } from '@angular/router';
import { AirportsService } from '../airports.service';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-airport-card',
  templateUrl: './airport-card.component.html',
  styleUrls: ['./airport-card.component.sass']
})
export class AirportCardComponent implements OnInit {
  airport: Airport;
  pilots: Pilot;
  planes: Airplane;
  hidden:boolean;
  id:number;
  path: string;
  constructor(private airService: AirportsService, private ar:ActivatedRoute, private route: Router) { 
  }
  
  ngOnInit() {
    if(!this.airport){
      this.path = this.ar.snapshot.paramMap.get("id");
      this.id = Number(this.path);
      this.airService.getAirportByID(this.id)
      .subscribe(airport => this.airport = airport)    
    }  
    this.hidden = true;
  }
  getPilotsNames(ids:[]){
    if(!this.pilots){
      this.airService.getPilotsNames(ids).subscribe(pilots => this.pilots = pilots) 
    }   
  }
  getPlanesNames(ids:[]){    
    if(!this.planes){ 
      this.airService.getPlanesNames(ids).subscribe(planes => this.planes = planes)   
    }    
  }
  passPlane(item:Airplane){
    this.airService.selectedAirplane = item;
    this.route.navigate(['/airplanes-list/airplane/' + item.id]);
  }
  passPilot(item:Pilot){
    this.airService.selectedPilot = item;
    this.route.navigate(['/pilots-list/pilot/' + item.id]);
  }
  editCard(){
    this.hidden = false;
  }
  
  saveCard(){
    this.hidden = true;
    this.airService.updateAirport(this.airport)
    .subscribe();
  }
}
