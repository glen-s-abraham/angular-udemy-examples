import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(private httpClient: HttpClient) {}
  getRooms(): Observable<Array<Room>> {
    return this.httpClient
      .get<Array<Room>>(environment.restUrl + '/api/rooms',{withCredentials:true})
      .pipe(
        map((data) => {
          const rooms = [];
          for (let room of data) {
            rooms.push(Room.fromHttp(room));
          }
          return rooms;
        })
      );
  }

  getBookings(date: string): Observable<Array<Booking>> {
    return this.httpClient
      .get<Array<Booking>>(environment.restUrl + '/api/bookings/' + date)
      .pipe(
        map((data) => {
          const bookings = new Array<Booking>();
          for (let booking of data) {
            bookings.push(Booking.fromHttp(booking));
          }
          return bookings;
        })
      );
  }

  getUsers(): Observable<Array<User>> {
    return this.httpClient
      .get<Array<User>>(environment.restUrl + '/api/users',{withCredentials:true})
      .pipe(
        map((data) => {
          const users = new Array<User>();
          for (const user of data) {
            users.push(User.fromHttp(user));
          }
          return users;
        })
      );
  }

  getBooking(id: number): Observable<Booking> {
    return this.httpClient
      .get<Booking>(environment.restUrl + '/api/bookings?id=' + id)
      .pipe(map((data) => Booking.fromHttp(data)));
  }
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(environment.restUrl + '/api/users', user,{withCredentials:true});
  }

  addUser(user: User, password: string): Observable<User> {
    const fullUser = { ...user, password };
    return this.httpClient.post<User>(
      environment.restUrl + '/api/users',
      fullUser,
      {withCredentials:true}
    );
  }

  private getCorrectedRoom(room: Room) {
    const correctedRoom = {
      ...room,
      capacities: [],
    };
    for (let lc of room.capacities) {
      let requiredLayout;
      for (let member in Layout) {
        if (Layout[member] === lc.layout) requiredLayout = member;
      }
      let correctedLayout = {
        layout: requiredLayout,
        capacity: lc.capacity,
      };
      correctedRoom.capacities.push(correctedLayout);
    }
    return correctedRoom;
  }

  updateRoom(room: Room): Observable<Room> {
    return this.httpClient.put<Room>(
      environment.restUrl + '/api/rooms',
      this.getCorrectedRoom(room),
      {withCredentials:true}
    );
  }

  addRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(
      environment.restUrl + '/api/rooms',
      this.getCorrectedRoom(room)
    );
  }

  deleteRoom(id: number): Observable<any> {
    return this.httpClient.delete(environment.restUrl + '/api/rooms/' + id);
  }

  resetPassword(id: number): Observable<any> {
    return of(null);
  }
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(environment.restUrl + '/api/users/' + id,{withCredentials:true});
  }

  saveBooking(booking: Booking): Observable<Booking> {
    return of(null);
  }

  addBooking(newbooking: Booking): Observable<Booking> {
    return of(null);
  }

  deleteBooking(id: number): Observable<any> {
    return this.httpClient.delete(environment.restUrl + '/api/bookings/' + id);
  }

  validateUser(name:string,password:string):Observable<{result:string}>{
    const authData = btoa(`${name}:${password}`);
    const headers = new HttpHeaders().append('Authorization','Basic '+authData);
    return this.httpClient.get<{result:string}>(environment.restUrl+"/api/basicAuth/validate",{
      headers,
      withCredentials:true
    })
  }

  getRole():Observable<{role:string}>{
    const headers = new HttpHeaders().append('X-Requested-With','XMLHttpRequest');
    return this.httpClient.get<{role:string}>(environment.restUrl+"/api/users/currentUserRole",{withCredentials:true,headers});
  }

  logout():Observable<String>{
    return this.httpClient.get<String>(environment.restUrl+"/api/users/logout",{withCredentials:true});
  }
}
