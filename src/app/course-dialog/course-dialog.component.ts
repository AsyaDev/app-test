import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.sass']
})
export class CourseDialogComponent implements OnInit {
  confirm:boolean;
  constructor( private dialogRef: MatDialogRef<CourseDialogComponent>) { 
  }

  ngOnInit() {
  }
  delete() {
    this.confirm = true;
    this.dialogRef.close(this.confirm);
  }

}
