import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent as OutsideDashboardComponent} from './outside/dashboard/dashboard.component';
import {DashboardComponent as InsideDashboardComponent} from './inside/dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {CookieGuard} from './cookie.guard';
import {WelcomeComponent} from './inside/welcome/welcome.component';
import {InsideComponent} from './inside/inside.component';

const routes: Routes = [
  {path: '', redirectTo: 'outside', pathMatch: 'full'},
  {path: 'inside/:room',component: InsideComponent},
  {path: 'outside', children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: OutsideDashboardComponent},
      {path: 'dashboard/:room', component: OutsideDashboardComponent},
      {path: 'dashboard/:room/:tomorrow', component: OutsideDashboardComponent}
    ]},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
