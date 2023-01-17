import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/Room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent {
  @Input() room!: Room;

  constructor(private router:Router){}

  editRoom(){
    this.router.navigate(['admin','rooms'],{
      queryParams:{
        id:this.room.id,
        action:'edit'
      }
    })
  }

}
