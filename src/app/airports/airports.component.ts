import { Component, OnInit } from '@angular/core';
import { Airport } from './airport'
import { AirportsService } from '../airports.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from "@angular/material";
import {CourseDialogComponent} from '../course-dialog/course-dialog.component'

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.sass']
})
export class AirportsComponent implements OnInit {
  airports: Airport[];
  config: any;
  green:boolean;
  
  constructor(private airService: AirportsService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 10,
      id:'first',
      totalItems:0
      
      };
      route.queryParams.subscribe(
      params => this.config.currentPage = params.page || 1);      
  }

  ngOnInit() {
    this.getAirports();

  }
  openDialog(airport:Airport) {
    const dialogRef = this.dialog.open(CourseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delete(airport)
      }
    });
}
  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }
  passItem(item:Airport){
    this.airService.selectedAirport = item;
  }
  getAirports(): void {
    this.airService.getAirports()
    .subscribe(airports => this.airports = airports);
  }
  delete(airport: Airport): void {
    this.airService.deleteAirport(airport).subscribe(
      () => {
        const index = this.airports.indexOf(airport);
        if(~index){
          this.airports.splice(index, 1);
        }
      }
    );
  }
}
