import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {Observable} from 'rxjs';
import {Meeting} from '../models/meeting.model';

@Injectable()
export class CalendarService{
  constructor(private http: HttpClient, private settings: SettingsService){}

  getEvents(room: string, maxEvents?: number): Promise<Meeting[]>{
    return new Promise<Meeting[]>(resolve => {
      if(!room || room === ''){
        resolve([]);
        return;
      }

      let url = this.getBaseUrl() + 'CalendarForRoom?room=' + room;
      if(maxEvents)
        url += '&maxEvents=' + maxEvents;
      this.http.get<any[]>(url).subscribe(result => {
        resolve(this.getMeetings(result));
      });
    });
  }

  initialized() {
    return this.settings.initialized;
  }

  private getMeetings(entities:any[]): Meeting[]{
    const meetings: Meeting[] = [];

    entities.forEach(entity => {
      let m = new Meeting();

      m.startTime = new Date(entity.start.dateTime);
      m.endTime = new Date(entity.end.dateTime);
      m.title = entity.summary;

      meetings.push(m);
    });

    return meetings;
  }

  private getBaseUrl(): string{
    return this.settings.serverUrl + 'Calendar/';
  }

}
