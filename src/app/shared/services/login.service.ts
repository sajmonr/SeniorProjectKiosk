import { Injectable } from '@angular/core';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isInitialized = false;

  constructor(){
    this.initClient();
  }

  login(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      gapi.auth2.getAuthInstance().signIn().then(() => {
        resolve(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    });
  }

  logout(): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      gapi.auth2.getAuthInstance().signOut().then(() => {
        resolve(!gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    });
  }

  isAuthenticated(): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      if(!this.isInitialized)
        this.initClient(() => resolve(gapi.auth2.getAuthInstance().isSignedIn.get()));
      else
        resolve(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  getUserName(): string{
    return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
  }

  private initClient(afterInit?: () => void) {
    if(!this.isInitialized) {
      gapi.load('client', () => {
        gapi.client.init({
          clientId: '657343126394-57o6cg2bids17g60arrs2vtklvrpjk3t.apps.googleusercontent.com',
          clientSecret: '7DqIucqnboL6L5X3BFhShC6L',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/presentations.readonly https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly'
        }).then(() => {
          this.isInitialized = true;
          if(afterInit)
            afterInit();
          this.loadScopes();
        });
      });
    }else{
      if(afterInit)
        afterInit();
    }
  }

  private loadScopes(){
    gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
    gapi.client.load('drive', 'v3', () => { console.log('loaded drive'); });
    gapi.client.load('admin', 'directory_v1', () => {console.log('loaded directory')});
  }
}
