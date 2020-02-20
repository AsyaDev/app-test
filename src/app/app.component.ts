import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { link } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'test-app';
  routeLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.routeLinks = [
      {
          label: 'Airports',
          link: './airports-list',
          index: 0
      }, {
          label: 'Pilots',
          link: './pilots-list',
          index: 1
      }, {
          label: 'Airplanes',
          link: './airplanes-list',
          index: 2
      }
    ]
  }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
  });
    
}

}
