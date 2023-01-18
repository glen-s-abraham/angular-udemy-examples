import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Booking } from '../models/Booking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  selectedDate: string;
  bookings: Array<Booking>;
  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.selectedDate = params['date'];
      if (!this.selectedDate)
        this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-IN');
      this.dataService
      .getBookings(this.selectedDate)
      .subscribe((bookings) => (this.bookings = bookings));
    });


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
      .subscribe((next) => this.router.navigate(['']));
  }
  dateChanged() {
    this.router.navigate([''], {
      queryParams: {
        date: this.selectedDate,
      },
    });
  }
}
