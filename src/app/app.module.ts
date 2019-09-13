import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import {LoginService} from './shared/services/login.service';
import {SettingsService} from './shared/services/settings.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient, LoginService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
