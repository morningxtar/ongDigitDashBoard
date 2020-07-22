import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EditUserComponent} from './edit-user/edit-user.component';
import {NewUserComponent} from './new-user/new-user.component';
import {MachineComponent} from './machine/machine.component';
import {PrestationComponent} from './prestation/prestation.component';
import {NewMachineComponent} from './new-machine/new-machine.component';
import {EditMachineComponent} from './edit-machine/edit-machine.component';
import { GlobalStatisticComponent } from './global-statistic/global-statistic.component';
import { NewPrestationComponent } from './new-prestation/new-prestation.component';
import { EditPrestationComponent } from './edit-prestation/edit-prestation.component';
import { AuthComponent } from './auth/auth.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ChartsModule} from 'ng2-charts';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlacesComponent } from './places/places.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', canActivate: [AuthGuardService], component: GlobalStatisticComponent},
  {path: 'authentification', component: AuthComponent},
  {
    path: 'users', canActivate: [AuthGuardService], children: [
      {path: '', component: UsersComponent},
      {path: 'new-user', component: NewUserComponent},
      {path: 'edit-user/:id', component: EditUserComponent},
      {path: 'statistiques/:id', component: UserStatsComponent},
    ]
  },
  {path: 'machines', canActivate: [AuthGuardService], children: [
      {path: '', component: MachineComponent},
      {path: 'new-machine', component: NewMachineComponent},
      {path: 'edit-machine/:id', component: EditMachineComponent},
    ]},
  {path: 'services', canActivate: [AuthGuardService], children: [
      {path: '', component: PrestationComponent},
      {path: 'new-service', component: NewPrestationComponent},
      {path: 'edit-service/:id', component: EditPrestationComponent},
    ]},
  {path: 'reservations', canActivate: [AuthGuardService], children: [
      {path: '', component: PlacesComponent},
      {path: 'new-service', component: NewPrestationComponent},
      {path: 'edit-service/:id', component: EditPrestationComponent},
    ]},
  {path: '**', redirectTo: 'not-found'},
  {path: 'not-found', component: FourOhFourComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FourOhFourComponent,
    EditUserComponent,
    NewUserComponent,
    MachineComponent,
    PrestationComponent,
    NewMachineComponent,
    EditMachineComponent,
    GlobalStatisticComponent,
    NewPrestationComponent,
    EditPrestationComponent,
    AuthComponent,
    UserStatsComponent,
    NavbarComponent,
    PlacesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
