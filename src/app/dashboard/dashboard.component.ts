import { Component, OnInit } from '@angular/core';
import {Meeting} from '../shared/models/meeting.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '../shared/services/settings.service';
import {MetadataTransformer} from '@angular/compiler-cli/src/transformers/metadata_cache';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  private maxVisibleMeetings = 3;
  private room: string;
  private clockTimer: number;
  private meetingTimer: number;
  private date: Date;
  private isLoaded = false;

  private currentMeeting: Meeting;
  private currentMeetingEndsIn: number;
  private todaysMeetings: Meeting[] = [];
  private tomorrowsMeetings: Meeting[] = [];

  constructor(private http: HttpClient, private router: Router, private settings: SettingsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.room = this.activatedRoute.snapshot.params['room'];

    this.settings.initialized.subscribe(init => {
      if(init){
        this.refreshMeetings();
      }
    });

    this.refreshDateTime();
    this.clockTimer = setInterval(() => this.refreshDateTime(), 1000);
    this.meetingTimer = setInterval(() => this.refreshMeetings(), 1000 * 60);
  }

  private onSettings(){
    this.router.navigate(['/settings']);
  }

  private refreshMeetings(){
    if(!this.settings.serverUrl || !this.room)
      return;

    this.http.get(this.settings.serverUrl + '/api/Calendar/CalendarForRoom?room=' + this.room).subscribe((meetings: any[]) => {
      this.createMeetings(meetings.slice(0, 4));
      this.isLoaded = true;
    }, error => {
      console.log('Failed to refresh meetings.');
      console.log(error);
    });
  }

  private createMeetings(meetings: any[]){
    const currentDate = new Date();
    const newMeetings: Meeting[] = [];
    const newTomorrowsMeetings: Meeting[] = [];

    meetings.forEach(meeting => {
      let m = new Meeting();

      m.startTime = new Date(meeting.start.dateTime);
      m.endTime = new Date(meeting.end.dateTime);
      m.title = meeting.summary;

      //Push tomorrows meetings into its own array.
      //We might want to use it later.
      if(m.startTime.getDate() == currentDate.getDate()){
        if(m.startTime < currentDate && m.endTime > currentDate){
          this.currentMeeting = m;
        }else{
          newMeetings.push(m);
        }
      }else if(m.startTime.getDate() == currentDate.getDate() + 1){
        newTomorrowsMeetings.push(m);
      }
    });

    this.todaysMeetings = newMeetings.length > this.maxVisibleMeetings ? newMeetings.splice(0, this.maxVisibleMeetings) : newMeetings;
    if(newMeetings.length < this.maxVisibleMeetings){
      this.tomorrowsMeetings = newTomorrowsMeetings.splice(0, this.maxVisibleMeetings - newMeetings.length);
    }
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
}
