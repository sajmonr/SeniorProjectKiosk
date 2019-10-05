import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../shared/services/message.service';
import {RoomService} from '../../shared/services/room.service';
import {Meeting} from '../../shared/models/meeting.model';
import {TimingService} from '../../shared/services/timing.service';


@Component({
  selector: 'app-inside-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit{
  @ViewChild('alertSound')alert: ElementRef;
  private date: Date;
  private room: string;
  private clockColor = '#78C000';

  @Input()currentMeeting: Meeting;
  private currentMeetingEndsIn = 0;
  private currentMeetingProgress = 0;
  private alertPlayCount = 0;
  private remainingTimeAlert = false;
  private limitedTimeAlert = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private message: MessageService,
              private roomService: RoomService,
              private timing: TimingService) {}

  ngOnInit() {
    this.startClock();
  }

  private startClock(){
    this.timing.tick.subscribe(this.refreshDateTime.bind(this));
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
    if(this.currentMeetingEndsIn <= 1000 * 60 * 7 && !this.limitedTimeAlert)
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
    const minutes = Math.ceil(this.currentMeetingEndsIn / 1000 / 60);
    this.message.error(minutes + ' minutes remaining', 'Meeting Ending Soon');
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
