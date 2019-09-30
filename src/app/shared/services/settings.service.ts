import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';

@Injectable()
export class SettingsService{
  @Output()initialized = new EventEmitter<boolean>();
  serverUrl: string;
  signalRUrl: string;

  constructor(private http: HttpClient){
    http.get('assets/appsettings.json').subscribe(settings => {
      this.serverUrl = settings['serverUrl'];
      this.signalRUrl = settings['signalRUrl'];
      this.initialized.emit(true);
    });
  }

}
