import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from './models/Booking';
import { Layout, LayoutCapacity, Room } from './models/Room';
import { User } from './models/User';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private httpClient:HttpClient){}
  getRooms(): Observable<Array<Room>> {
    return this.httpClient.get<Array<Room>>(environment.restUrl+"/api/rooms").pipe(
      map(data=>{
        const rooms = [];
        for(let room of data){
          rooms.push(Room.fromHttp(room));
        }
        return rooms;
      })
    );
  }

  getBookings(date:string): Observable<Array<Booking>> {
    return of(null);
  }

  getUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(environment.restUrl+"/api/users").pipe(
      map(data=>{
        const users = new Array<User>();
        for(const user of data){
          users.push(User.fromHttp(user));
        }
        return users;
      })
    )
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
