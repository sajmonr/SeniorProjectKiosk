import { Component, OnInit } from '@angular/core';
import {RoomDevice, RoomDeviceType} from '../shared/models/room-device.model';
import {Meeting} from '../shared/models/meeting.model';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../shared/services/message.service';
import {RoomService} from '../shared/services/room.service';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.less']
})
export class InsideComponent {

}
