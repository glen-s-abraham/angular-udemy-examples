import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room } from './models/Room';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms: Array<Room>;
  users: Array<User>;

  constructor() {
    const capacity1 = new LayoutCapacity(Layout.THEATER,50);
    const capacity2 = new LayoutCapacity(Layout.USHAPE,20);
    const capacity3 = new LayoutCapacity(Layout.THEATER,60);
    this.rooms = new Array<Room>();
    const room1 = new Room(1,'First Room',[capacity1],'First Floor');
    const room2 = new Room(2,'Second Room',[capacity2,capacity3],'Third Floor');
    this.rooms.push(room1);
    this.rooms.push(room2);
    this.users = new Array<User>();
    const user1 = new User(1,'Matt');
    const user2 = new User(2,'Diana');
    const user3 = new User(3,'Suzane');
    user3.id = 3;
    user3.name = 'Suzanne';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
  }
}
