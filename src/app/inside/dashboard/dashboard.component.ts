import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('alertSound')alert: ElementRef;
  private date: Date;
  private room: string;
  private roomDevice: RoomDevice;
  private clockColor = '#78C000';

  private currentMeeting: Meeting;
  private currentMeetingEndsIn = 0;
  private currentMeetingProgress = 0;
  private alertPlayCount = 0;
  private remainingTimeAlert = false;
  private limitedTimeAlert = false;

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
    this.startClock();
    //this.message.error('5 minutes remaining', 'Limited time')
  }

  private selectMeeting(meetings: Meeting[]){
    const today = new Date();
    const meeting = meetings.filter(m => m.startTime < today && m.endTime > today);

    if(meeting.length > 0){
      this.startMeeting(meeting[meeting.length - 1]);
    }
  }
  private startClock(){
    this.timing.tick.subscribe(this.refreshDateTime.bind(this));
  }
  private stopClock(){
    this.timing.tick.unsubscribe();
  }
  private subscribeToNewMeetings(){
    this.roomService.meetingsUpdated.subscribe(meetings => this.selectMeeting(meetings));
  }
  private unsubscribeFromNewMeetings(){
    this.roomService.meetingsUpdated.unsubscribe();
  }
  private refreshDateTime(){
    this.date = new Date();
    this.refreshCurrentMeeting();
  }
  private refreshCurrentMeeting(){
    if(!this.currentMeeting)
      return;

    const remainingTime = this.currentMeeting.endTime.getTime() - new Date().getTime();

    if(remainingTime <= 0){
      this.endMeeting();
      return;
    }

    this.currentMeetingEndsIn = remainingTime;

    this.calculateMeetingProgress();
    this.checkClockColor();

    if(this.alertPlayCount == 0 && this.currentMeetingEndsIn <= 1000 * 60)
      this.playAlert();
    if(this.currentMeetingEndsIn <= 1000 * 30)
      this.showFullsreenAlert();
    if(this.currentMeetingEndsIn <= 1000 * 60 * 3)
      this.showModalAlert();
    if(this.currentMeetingEndsIn <= 1000 * 60 * 2 && this.limitedTimeAlert)
      this.hideModalAlert();
  }
  private calculateMeetingProgress(){
    if(!this.currentMeeting)
      this.currentMeetingProgress = 0;

    const now = new Date().getTime();
    const start = this.currentMeeting.startTime.getTime();
    const end = this.currentMeeting.endTime.getTime();

    this.currentMeetingProgress = (now - start) / (end - start) * 100;
  }

  private showModalAlert(){
    this.limitedTimeAlert = true;
    this.message.error('5 minutes remaining', 'Meeting Ending Soon');
  }

  private hideModalAlert(){
    this.message.hideMessage();
  }

  private showFullsreenAlert(){
    this.remainingTimeAlert = true;
  }

  private hideFullscreenAlert(){
    this.remainingTimeAlert = false;
  }

  private checkClockColor(){
    this.clockColor = this.currentMeetingProgress > 80 ? '#f85032' : '#78C000';
  }
  private playAlert(){
    this.alertPlayCount++;
    this.alert.nativeElement.play()
  }
  private endMeeting(){
    this.resetRoom();
    this.subscribeToNewMeetings();
  }
  private startMeeting(meeting: Meeting){
    this.unsubscribeFromNewMeetings();
    this.currentMeeting = meeting;
  }
  private loadRouteParams(){
    this.room = this.activatedRoute.snapshot.params['room'];
  }
  private resetRoom(){
    this.currentMeeting = null;
    this.currentMeetingEndsIn = 0;
    this.currentMeetingProgress = 0;
    this.alertPlayCount = 0;
    this.remainingTimeAlert = false;
    this.limitedTimeAlert = false;
  }
}
