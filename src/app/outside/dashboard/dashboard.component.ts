import { Component, OnInit } from '@angular/core';
import {Meeting} from '../../shared/models/meeting.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarService} from '../../shared/services/calendar.service';
import {MessageService} from '../../shared/services/message.service';

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
  private meetingsToday: Meeting[] = [];
  private meetingsTomorrow: Meeting[] = [];

  constructor(private activatedRoute: ActivatedRoute, private calendar: CalendarService, private message: MessageService){}

  ngOnInit() {
    this.loadRouteParams();

    if(!this.room){
      this.message.error('You have not selected any room. You will not see any results. :(');
    }

    this.calendar.initialized().subscribe(() => {
      this.refreshMeetings();
    });

    this.refreshDateTime();
    this.clockTimer = setInterval(() => this.refreshDateTime(), 1000);
    this.meetingTimer = setInterval(() => this.refreshMeetings(), 1000 * 60);
  }

  private organizeMeetings(meetings: Meeting[]) {
    const today = new Date();
    const newToday: Meeting[] = [];
    const newTomorrow: Meeting[] = [];

    meetings.forEach(meeting => {
      if(meeting.startTime.getDate() == today.getDate()){
        if(meeting.startTime < today && meeting.endTime > today){
          this.currentMeeting = meeting;
        }else{
          newToday.push(meeting);
        }
      }else if(meeting.startTime.getDate() == today.getDate() + 1){
        newTomorrow.push(meeting);
      }
    });

    this.meetingsToday = newToday;
    this.meetingsTomorrow = newTomorrow;
  }

  private refreshMeetings(){
    this.calendar.getEvents(this.room, 15).then(meetings => {
      console.log('INFO: Meetings refreshed on ' + new Date());
      this.isLoaded = true;
      this.currentMeeting = null;
      this.organizeMeetings(meetings);
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

  private onDummyMeetingToggle(){
    if(!this.currentMeeting){
      this.createDummyCurrentMeeting();
    }else{
      this.refreshMeetings();
    }
  }

  private createDummyCurrentMeeting(){
    const today = new Date();
    const meeting = new Meeting();

    meeting.startTime = new Date(today.getTime() - 1000 * 60 * 60);
    meeting.endTime = new Date(today.getTime() + 1000 * 60 * 58);
    meeting.title = "Dummy meeting - just for dummies :)";

    this.currentMeeting = meeting;
    this.meetingsToday.splice(0, 0, meeting);
  }

}
