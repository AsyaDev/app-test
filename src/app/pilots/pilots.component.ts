import { Component, OnInit } from '@angular/core';
import { Pilot } from './pilot'
import { AirportsService } from '../airports.service';

import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from "@angular/material";
import {CourseDialogComponent} from '../course-dialog/course-dialog.component'

@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.sass']
})
export class PilotsComponent implements OnInit {
  pilots: Pilot[];
  config:any;
  constructor(private airService: AirportsService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 10,
      id:'third',
      totalItems:0
      
      };
      route.queryParams.subscribe(
      params => this.config.currentPage = params.page || 1);      
  }

  ngOnInit() {
    this.getPilots();
  }
  openDialog(pilot:Pilot) {
    const dialogRef = this.dialog.open(CourseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delete(pilot)
      }
    });
  }
  pageChange(newPage: number) {
    this.router.navigate(['pilots-list'], { queryParams: { page: newPage } });
  }
  passItem(item:Pilot){
    this.airService.selectedPilot = item;
  }
  getPilots(): void {
    this.airService.getPilots()
    .subscribe(pilots => this.pilots = pilots);
  }
  delete(pilot: Pilot): void {    
    this.airService.deletePilot(pilot).subscribe(
      () => {
        const index = this.pilots.indexOf(pilot);
        if(~index){
          this.pilots.splice(index, 1);
        }
      }
    );
  }

}
