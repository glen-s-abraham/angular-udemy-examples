import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Booking } from '../models/Booking';
import { User } from '../models/User';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  selectedDate: string;
  bookings: Array<Booking>;
  dataLoaded:boolean=false;
  isAdminUser=false;
  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService
  ) {}
  loadData(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.selectedDate = params['date'];
      if (!this.selectedDate)
        this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-IN');
      this.dataService
      .getBookings(this.selectedDate)
      .subscribe((bookings) =>{
        (this.bookings = bookings);
        this.dataLoaded=true
      });
    });
  }
  ngOnInit(): void {

    this.loadData();
    if(this.authService.role==='ADMIN') this.isAdminUser = true;
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {
      queryParams: {
        id,
      },
    });
  }
  saveBooking() {
    this.router.navigate(['addBooking']);
  }
  deleteBooking(id: number) {
    this.dataService
      .deleteBooking(id)
      .subscribe({
        next:(next) =>{
         this.loadData();
        },
        error:err=>{
          console.log(err);
        }
    });
  }
  dateChanged() {
    this.router.navigate([''], {
      queryParams: {
        date: this.selectedDate,
      },
    });
  }
}
