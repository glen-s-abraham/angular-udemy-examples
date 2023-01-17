import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    const room1 = new Room();
    room1.id=1;
    room1.name='First Room';
    room1.capacities=[capacity1];
    room1.location='First Floor';
    const room2 = new Room();
    room2.id=2;
    room2.name='Second Room';
    room2.capacities=[capacity2,capacity3];
    room2.location='Third Floor';
    this.rooms.push(room1);
    this.rooms.push(room2);
    this.users = new Array<User>();
    const user1 = new User();
    user1.id=1;
    user1.name='Matt'
    const user2 = new User();
    user2.id=2,
    user2.name='Diana'
    const user3 = new User();
    user3.id=3,
    user3.name='Suzane'
    user3.id = 3;
    user3.name = 'Suzanne';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
  }

  getRooms():Observable<Array<Room>>{
    return of(this.rooms);
  }

  getUsers():Observable<Array<User>>{
    return of(this.users);
  }

  updateUser(user:User):Observable<User>{
    const originalUser = this.users.find(u=>u.id===user.id);
    originalUser!.name = user.name;
    return of(originalUser!);
  }

  addUser(user:User,password:string):Observable<User>{
    const id = (this.users.sort((user1,user2)=>user2.id-user1.id)[0]).id+1;
    const newUser = user;
    newUser.id = id;
    this.users.push(newUser);
    return of(newUser);
  }

  updateRoom(room:Room):Observable<Room>{
    const originalRoom  = this.rooms.find(r=>r.id===room.id);
    originalRoom.name = room.name;
    originalRoom.location = room.location;
    originalRoom.capacities = room.capacities;
    return of(originalRoom);
  }

  addRoom(room:Room):Observable<Room>{
    const id = (this.users.sort((room1,room2)=>room2.id-room1.id)[0]).id+1;
    const newRoom = room;
    console.log(newRoom);
    newRoom.id = id;
    this.rooms.push(newRoom);
    return of(newRoom);
  }

}
