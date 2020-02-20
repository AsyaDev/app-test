import { Component, OnInit } from '@angular/core';
import { Airport } from '../airports/airport'
import { Pilot } from '../pilots/pilot';
import { Airplane } from '../airplanes/airplane';
import { Router } from '@angular/router';
import { AirportsService } from '../airports.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-airplane-card',
  templateUrl: './airplane-card.component.html',
  styleUrls: ['./airplane-card.component.sass']
})
export class AirplaneCardComponent implements OnInit {
  airplane: Airplane;
  airports: Airport;
  pilots: Pilot;
  hidden:boolean;
  id:number;
  path: string;
  constructor(private airService: AirportsService, private ar:ActivatedRoute, private route:Router) { 
  }

  ngOnInit() {
    if(!this.airplane){
      this.path = this.ar.snapshot.paramMap.get("id");
      this.id = Number(this.path);
      this.airService.getPlaneByID(this.id)
      .subscribe(airplane => this.airplane = airplane)    
    }  
    this.hidden = true;
  }
  getPilotsNames(ids:[]){ 
    if(!this.pilots){
      this.airService.getPilotsNames(ids).subscribe(pilots => this.pilots = pilots)
    }
  }
  getAirportsNames(ids:[]){ 
    if(!this.airports){
      this.airService.getAirportsNames(ids).subscribe(airports => this.airports = airports)
    }
  }
  passPilot(item:Pilot){
    this.airService.selectedPilot = item;
    this.route.navigate(['/pilots-list/pilot/' + item.id]);
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
    this.airService.updateAirplane(this.airplane)
    .subscribe();
  }
}
