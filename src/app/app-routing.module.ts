import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthRouteGuardService } from './auth-route-guard.service';
import { CalendarComponent } from './calendar/calendar.component';
import { EditBookingComponent } from './calendar/edit-booking/edit-booking.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrefetchRoomsService } from './prefetch-rooms.service';
import { PrefetchUsersService } from './prefetch-users.service';

const routes: Routes = [
  {path:'editBooking',component:EditBookingComponent,resolve:{rooms:PrefetchRoomsService,users:PrefetchUsersService},canActivate:[AuthRouteGuardService]},
  {path:'addBooking',component:EditBookingComponent,resolve:{rooms:PrefetchRoomsService,users:PrefetchUsersService},canActivate:[AuthRouteGuardService]},
  { path:'admin/users',component:UsersComponent,canActivate:[AuthRouteGuardService]},
  { path:'admin/rooms',component:RoomsComponent,canActivate:[AuthRouteGuardService]},
  { path:'',component:CalendarComponent},
  {path:'login',component:LoginComponent},
  {path:'404',component:PageNotFoundComponent},
  //wild card should be at end of the list
  {path:'**',redirectTo:'/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
