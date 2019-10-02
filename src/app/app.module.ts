import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent as OutsideDashboardComponent } from './outside/dashboard/dashboard.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import {SettingsService} from './shared/services/settings.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { InsideComponent } from './inside/inside.component';
import { OutsideComponent } from './outside/outside.component';
import {DashboardComponent as InsideDashboardComponent} from './inside/dashboard/dashboard.component'
import {CalendarService} from './shared/services/calendar.service';
import {MessageService} from './shared/services/message.service';
import {MessageComponent} from './shared/components/message/message.component';
import { ScheduleComponent } from './outside/dashboard/dashboard.schedule/dashboard.schedule.component';
import {RoomService} from './shared/services/room.service';
import {TimePipe} from './shared/pipes/time.pipe';
import { WelcomeComponent } from './inside/welcome/welcome.component';
import {TimingService} from './shared/services/timing.service';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {CookieGuard} from './cookie.guard';
import {CookieService} from 'ngx-cookie-service';
import { TimeAlertComponent } from './inside/dashboard/time-alert/time-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    OutsideDashboardComponent,
    InsideDashboardComponent,
    SettingsComponent,
    SpinnerComponent,
    InsideComponent,
    OutsideComponent,
    ScheduleComponent,
    TimePipe,
    WelcomeComponent,
    TimeAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "maxPercent": 100,
      "clockwise": false,
      "animation": false
    })
  ],
  providers: [HttpClient, CookieGuard, CookieService, SettingsService, CalendarService, MessageService, RoomService, TimingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
