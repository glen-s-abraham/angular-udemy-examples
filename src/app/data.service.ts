import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from './models/Booking';
import { Layout, LayoutCapacity, Room } from './models/Room';
import { User } from './models/User';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(){}
  getRooms(): Observable<Array<Room>> {
    return of(null);
  }

  getBookings(date:string): Observable<Array<Booking>> {
    return of(null);
  }

  getUsers(): Observable<Array<User>> {
    return of(null);
  }

  getBooking(id: number):Observable<Booking> {
    return of(null);
  }
  updateUser(user: User): Observable<User> {
    return of(null);
  }

  addUser(user: User, password: string): Observable<User> {
    return of(null);
  }

  updateRoom(room: Room): Observable<Room> {
    return of(null);
  }

  addRoom(room: Room): Observable<Room> {
    return of(null);
  }

  deleteRoom(id: number): Observable<any> {
    return of(null);
  }

  resetPassword(id: number): Observable<any> {
    return of(null);
  }
  deleteUser(id: number): Observable<any> {
    return of(null);
  }

  saveBooking(booking:Booking):Observable<Booking>{
    return of(null)
  }

  addBooking(newbooking:Booking):Observable<Booking>{
    return of(null);
  }

  deleteBooking(id: number): Observable<any> {
    return of(null);
  }
}
