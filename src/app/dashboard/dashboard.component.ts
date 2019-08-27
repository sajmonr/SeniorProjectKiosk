import { Component, OnInit } from '@angular/core';
import {Meeting} from '../shared/models/meeting.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  private vacant = true;
  private clockTimer: number;
  private time: string;
  private date: string;

  private upcomingMeetings: Meeting[] = [
    new Meeting('11:00 AM', '12:15 PM', 'Test meeting 1'),
    new Meeting('12:30 PM', '1:15 PM', 'Test meeting 2'),
    new Meeting('1:30 PM', '2:00 PM', 'Test meeting 3'),
    new Meeting('4:30 PM', '6:00 PM', 'Test meeting 4')
  ];

  constructor() { }

  ngOnInit() {
    this.refreshDateTime();
    this.clockTimer = setInterval(() => this.refreshDateTime(), 1000);
  }

  private refreshDateTime(){
    let date = new Date();
    this.time = this.formatAmPm(date);
    this.date = this.getDayString(date) + ' ' + this.getDateString(date) + ' ' + this.getMonthString(date) + ', ' + date.getFullYear();
  }

  private formatAmPm(date): string {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }
  private getDayString(date: Date){
    switch(date.getDay()){
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
    }
  }
  private getDateString(date: Date): string{
    switch(date.getDate()){
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return date.getDate() + 'th';
    }
  }
  private getMonthString(date: Date): string{
    switch(date.getMonth()){
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
    }
  }
}
