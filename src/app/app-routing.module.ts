import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { UsersComponent } from './admin/users/users.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path:'admin/users',component:UsersComponent},
  { path:'admin/rooms',component:RoomsComponent},
  { path:'calendar',component:CalendarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
