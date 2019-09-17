import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import {SettingsService} from './shared/services/settings.service';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
