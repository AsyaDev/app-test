import { Component, OnInit } from '@angular/core';
import { Airplane } from './airplane'
import { AirportsService } from '../airports.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from "@angular/material";
import {CourseDialogComponent} from '../course-dialog/course-dialog.component'

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.sass']
})
export class AirplanesComponent implements OnInit {
  planes: Airplane[];
  config: any;
  constructor(private airService: AirportsService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 10,
      id:'second',
      totalItems:0      
      };
      route.queryParams.subscribe(
      params => this.config.currentPage = params.page || 1);      

  }
  getBackgroundColor(plane:Airplane){
    const isGreen = plane.code.includes('a');
    return isGreen;
  }
  openDialog(plane:Airplane) {
    const dialogRef = this.dialog.open(CourseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delete(plane)
      }
    });
}
  pageChange(newPage: number) {
    this.router.navigate(['airplanes-list/'], { queryParams: { page: newPage } });
  }
  ngOnInit() {
    this.getPlanes();
  }
  passItem(item:Airplane){
    this.airService.selectedAirplane = item;
  }
  getPlanes(): void {
    this.airService.getPlanes()
    .subscribe(planes => this.planes = planes);
  }
  
  delete(plane: Airplane): void {
     this.airService.deleteAirplane(plane).subscribe(
      () => {
        const index = this.planes.indexOf(plane);
        if(~index){
          this.planes.splice(index, 1);
        }
      }
    );
   }

}
