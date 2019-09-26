import {Component, Input} from '@angular/core';
import {Meeting} from '../../../shared/models/meeting.model';

@Component({
  selector: 'app-dashboard-schedule',
  templateUrl: './dashboard.schedule.component.html',
  styleUrls: ['./dashboard.schedule.component.less', '../dashboard.component.less']
})
export class ScheduleComponent {
  @Input('meetingsToday')meetingsToday: Meeting[] = [];
  @Input('meetingsTomorrow')meetingsTomorrow: Meeting[] = [];

}
