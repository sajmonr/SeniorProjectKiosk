import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../shared/services/message.service';
import {RoomService} from '../../shared/services/room.service';
import {RoomDevice, RoomDeviceType} from '../../shared/models/room-device.model';
import {Meeting} from '../../shared/models/meeting.model';
import {TimingService} from '../../shared/services/timing.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit{
  private date: Date;
  private room: string;
  private roomDevice: RoomDevice;

  private currentMeeting: Meeting;
  private currentMeetingEndsIn = 0;
  private currentMeetingProgress = 0;

  constructor(private activatedRoute: ActivatedRoute, private message: MessageService, private roomService: RoomService, private timing: TimingService) {
    this.loadRouteParams();

    this.roomDevice = new RoomDevice();
    this.roomDevice.type = RoomDeviceType.InsideKiosk;
    this.roomDevice.name = this.room + ' Inside Kiosk';
  }

  ngOnInit() {
    if(!this.room){
      this.message.error('You have not selected any room. You will not see any results. :(');
    }
    this.roomService.connected.subscribe(result => {
      this.roomService.getMeetings(this.room, 15).then(result => {
        this.selectMeeting(result);
      });
    });

    this.refreshDateTime();
    this.timing.tick.subscribe(this.refreshDateTime.bind(this));
  }

  private selectMeeting(meetings: Meeting[]){
    const today = new Date();
    const meeting = meetings.filter(m => m.startTime < today && m.endTime > today);

    if(meeting.length > 0){
      this.currentMeeting = meeting[meeting.length - 1];
    }
  }

  private subscribeToNewMeetings(){
    this.roomService.meetingsUpdated.subscribe(meetings => this.selectMeeting(meetings));
  }
  private unsubscribeFromNewMeetings(){
    this.roomService.meetingsUpdated.unsubscribe();
  }
  private refreshDateTime(){
    this.date = new Date();
    if(this.currentMeeting){
      this.currentMeetingEndsIn = this.currentMeeting.endTime.getTime() - new Date().getTime();
      this.calculateMeetingProgress();
    }
  }
  private calculateMeetingProgress(){
    if(!this.currentMeeting)
      this.currentMeetingProgress = 0;

    const now = new Date().getTime();
    const start = this.currentMeeting.startTime.getTime();
    const end = this.currentMeeting.endTime.getTime();

    this.currentMeetingProgress = (now - start) / (end - start) * 100;
  }

  private loadRouteParams(){
    this.room = this.activatedRoute.snapshot.params['room'];
  }
}
