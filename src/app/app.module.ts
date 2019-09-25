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

@NgModule({
  declarations: [
    AppComponent,
    OutsideDashboardComponent,
    InsideDashboardComponent,
    SettingsComponent,
    SpinnerComponent,
    InsideComponent,
    OutsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient, SettingsService, CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
