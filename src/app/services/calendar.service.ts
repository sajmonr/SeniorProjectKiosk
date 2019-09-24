import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../shared/services/settings.service';
import {Observable} from 'rxjs';
import {Meeting} from '../shared/models/meeting.model';

@Injectable()
export class CalendarService{
  constructor(private http: HttpClient, private settings: SettingsService){}

  getEvents(room: string, maxEvents?: number): Meeting[]{
    if(!room)
      return;

    let url = this.getBaseUrl() + 'CalendarForRoom?room=' + room;
    if(maxEvents)
      url += '&maxEvents=' + maxEvents;

    this.http.get(url).subscribe(result => {
      console.log(result);
    });
  }

  initialized() {
    return this.settings.initialized;
  }

  private getBaseUrl(): string{
    return this.settings.serverUrl + 'Calendar/';
  }

}
