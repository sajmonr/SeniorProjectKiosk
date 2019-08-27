import { Component, OnInit } from '@angular/core';
import {Meeting} from '../shared/models/meeting.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  private vacant = true;
  private upcomingMeetings: Meeting[] = [
    new Meeting('11:00 AM', '12:15 PM', 'Test meeting 1'),
    new Meeting('12:30 PM', '1:15 PM', 'Test meeting 2'),
    new Meeting('1:30 PM', '2:00 PM', 'Test meeting 3'),
    new Meeting('4:30 PM', '6:00 PM', 'Test meeting 4')
  ];

  constructor() { }

  ngOnInit() {
  }
}
