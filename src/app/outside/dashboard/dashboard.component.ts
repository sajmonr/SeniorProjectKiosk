import { Component, OnInit } from '@angular/core';
import {Meeting} from '../../shared/models/meeting.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarService} from '../../shared/services/calendar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  private maxVisibleMeetings = 4;
  private room: string;
  private showTomorrow = true;
  private clockTimer: number;
  private meetingTimer: number;
  private date: Date;
  private isLoaded = false;

  private currentMeeting: Meeting;
  private currentMeetingEndsIn: number;
  private meetings: Meeting[] = [];

  constructor(private activatedRoute: ActivatedRoute, private calendar: CalendarService){}

  ngOnInit() {
    this.loadRouteParams();

    this.calendar.initialized().subscribe(() => {
      this.refreshMeetings();
    });

    this.refreshDateTime();
    this.clockTimer = setInterval(() => this.refreshDateTime(), 1000);
    this.meetingTimer = setInterval(() => this.refreshMeetings(), 1000 * 60);
  }

  private organizeMeetings(meetings: Meeting[]) {
    const today = new Date();

    meetings.forEach(meeting => {
      if(meeting.startTime < today && meeting.endTime > today){
        this.currentMeeting = meeting;
        return;
      }
    });

    this.meetings = meetings;

  }

  private refreshMeetings(){
    this.calendar.getEvents(this.room, 15).then(meetings => {
      console.log('INFO: Meetings refreshed on ' + new Date());
      this.isLoaded = true;
      this.organizeMeetings(meetings);
      if(!this.currentMeeting)
        this.createDummyCurrentMeeting();
      this.refreshDateTime();
    });
  }

  private refreshDateTime(){
    this.date = new Date();
    if(this.currentMeeting){
      this.currentMeetingEndsIn = this.differenceInMinutes(this.currentMeeting.endTime);
    }
  }

  private differenceInMinutes(date): number{
    if(!date)
      return;

    const difference = (date.getTime() - new Date().getTime()) / 1000 / 60;

    return Math.abs(Math.round(difference));
  }

  private loadRouteParams(){
    this.room = this.activatedRoute.snapshot.params['room'];
    if(this.activatedRoute.snapshot.params['tomorrow']){
      this.showTomorrow =this.activatedRoute.snapshot.params['tomorrow'] == 1;
    }
  }

  private createDummyCurrentMeeting(){
    const today = new Date();
    const meeting = new Meeting();

    meeting.startTime = new Date(today.getTime() - 1000 * 60 * 60);
    meeting.endTime = new Date(today.getTime() + 1000 * 60 * 58);
    meeting.title = "Dummy meeting - just for dummies :)";

    this.currentMeeting = meeting;
    this.meetings.splice(0, 0, meeting);
  }

}
