import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../../shared/services/calendar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(private calendar: CalendarService) { }

  ngOnInit() {
    this.calendar.initialized().subscribe(() => {
      console.log('ahoj');
      console.log(this.calendar.getEvents('CX-ThePub'));
    });
  }

}
