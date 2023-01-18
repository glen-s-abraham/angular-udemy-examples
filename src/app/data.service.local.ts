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
  rooms: Array<Room>;
  users: Array<User>;
  bookings: Array<Booking>;

  constructor() {
    console.log(environment.restUrl);
    const capacity1 = new LayoutCapacity(Layout.THEATER, 50);
    const capacity2 = new LayoutCapacity(Layout.USHAPE, 20);
    const capacity3 = new LayoutCapacity(Layout.THEATER, 60);
    this.rooms = new Array<Room>();
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'First Room';
    room1.capacities = [capacity1];
    room1.location = 'First Floor';
    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second Room';
    room2.capacities = [capacity2, capacity3];
    room2.location = 'Third Floor';
    this.rooms.push(room1);
    this.rooms.push(room2);
    this.users = new Array<User>();
    const user1 = new User();
    user1.id = 1;
    user1.name = 'Matt';
    const user2 = new User();
    (user2.id = 2), (user2.name = 'Diana');
    const user3 = new User();
    (user3.id = 3), (user3.name = 'Suzane');
    user3.id = 3;
    user3.name = 'Suzanne';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
    this.bookings = new Array<Booking>();
    const booking1 = new Booking();
    booking1.id = 1;
    booking1.room = room1;
    booking1.user = user1;
    booking1.layout = Layout.THEATER;
    booking1.title = 'Example meeting';
    booking1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking1.startTime = '11:30';
    booking1.endTime = '12:30';
    booking1.participants = 12;
    const booking2 = new Booking();
    booking2.id = 2;
    booking2.room = room2;
    booking2.user = user2;
    booking2.layout = Layout.USHAPE;
    booking2.title = 'Another meeting';
    booking2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking2.startTime = '14:00';
    booking2.endTime = '15:00';
    booking2.participants = 5;
    this.bookings.push(booking1);
    this.bookings.push(booking2);
  }

  getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  getBookings(date:string): Observable<Array<Booking>> {
    console.log(this.bookings);
    return of(this.bookings.filter(booking=>booking.date===date));
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  getBooking(id: number):Observable<Booking> {
    return of(this.bookings.find(booking=>booking.id===id));
  }
  updateUser(user: User): Observable<User> {
    const originalUser = this.users.find((u) => u.id === user.id);
    originalUser!.name = user.name;
    return of(originalUser!);
  }

  addUser(user: User, password: string): Observable<User> {
    const id = this.users.sort((user1, user2) => user2.id - user1.id)[0].id + 1;
    const newUser = user;
    newUser.id = id;
    this.users.push(newUser);
    return of(newUser);
  }

  updateRoom(room: Room): Observable<Room> {
    const originalRoom = this.rooms.find((r) => r.id === room.id);
    originalRoom.name = room.name;
    originalRoom.location = room.location;
    originalRoom.capacities = room.capacities;
    return of(originalRoom);
  }

  addRoom(room: Room): Observable<Room> {
    const id = this.users.sort((room1, room2) => room2.id - room1.id)[0].id + 1;
    const newRoom = room;
    console.log(newRoom);
    newRoom.id = id;
    this.rooms.push(newRoom);
    return of(newRoom);
  }

  deleteRoom(id: number): Observable<any> {
    this.rooms.splice(
      this.rooms.findIndex((room) => room.id === id),
      1
    );
    return of(null);
  }

  resetPassword(id: number): Observable<any> {
    return of(null);
  }
  deleteUser(id: number): Observable<any> {
    this.users.splice(
      this.users.findIndex((room) => room.id === id),
      1
    );
    return of(null);
  }

  saveBooking(booking:Booking):Observable<Booking>{
    const originalBooking = this.bookings.find(b=>b.id===booking.id);
    originalBooking.date = booking.date;
    originalBooking.endTime = booking.endTime;
    originalBooking.startTime = booking.startTime;
    originalBooking.title = booking.title;
    originalBooking.layout = booking.layout;
    originalBooking.room = booking.room;
    originalBooking.user = booking.user;
    originalBooking.participants = booking.participants;
    return of(originalBooking)
  }

  addBooking(newbooking:Booking):Observable<Booking>{
    const id = this.bookings.length>0?this.bookings.sort((booking1,booking2)=>booking2.id=booking1.id)[0].id+1:1;
    newbooking.id = id;
    this.bookings.push(newbooking);
    return of(newbooking);
  }

  deleteBooking(id: number): Observable<any> {
    this.bookings.splice(
      this.users.findIndex((booking) => booking.id === id),
      1
    );
    return of(null);
  }
}
