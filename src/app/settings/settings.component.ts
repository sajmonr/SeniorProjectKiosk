import { Component, OnInit } from '@angular/core';
import {LoginService} from '../shared/services/login.service';

declare var gapi: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onLogin(){
    this.loginService.login().then(() => {
      console.log('logged in');
    })
  }

  onLogout(){
    this.loginService.logout();
  }

  private onLoad(){
    //console.log(gapi.client);
    gapi.client.directory.resources.calendars.list({
      'customer': 'my_customer'
    }).then(function(response) {
      console.log(response);
    });

  }

}
