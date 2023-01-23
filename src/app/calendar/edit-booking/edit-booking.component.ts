import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Booking } from 'src/app/models/Booking';
import { Layout, Room } from 'src/app/models/Room';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css'],
})
export class EditBookingComponent implements OnInit {
  booking: Booking;
  rooms: Array<Room>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  users: Array<User>;
  dataLoaded = false;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
  ) {}
  ngOnInit() {
    this.rooms = this.activatedRoute.snapshot.data['rooms'];
    this.users = this.activatedRoute.snapshot.data['users'];
    console.log(this.rooms)
    const id = this.activatedRoute.snapshot.queryParams['id'];
    if (id) {
      this.dataService
        .getBooking(+id)
        .pipe(
          map(booking=>{
            booking.room = this.rooms.find(({id})=>id===booking.room.id);
            booking.user = this.users.find(({id})=>id===booking.user.id);
            return booking;
          })
        )
        .subscribe((next) => {
          (this.booking = next)
          this.dataLoaded = true;
        });
    } else {
      this.booking = new Booking();
      this.dataLoaded = true;
    }
  }

  onSubmit(){
    if(this.booking.id !=null){
      this.dataService.saveBooking(this.booking).subscribe(next=>this.router.navigate(['']))
    }else{
      this.dataService.addBooking(this.booking).subscribe(next=>this.router.navigate(['']))
    }
  }
}
