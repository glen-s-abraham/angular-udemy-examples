import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/models/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms!: Room[];
  selectedRoom!: Room;
  action:string;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.dataService.getRooms().subscribe(rooms=>{this.rooms = rooms});
    this.activatedRoute.queryParams.subscribe((params) => {
      const { id} = params;
      this.action = params['action'];
      if (id) {
        this.selectedRoom = this.rooms.find((room) => room.id === +id);

      }
      if(this.action=== 'add'){
        this.selectedRoom = new Room();
        this.action = 'edit';
      }

    });
  }
  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {
      queryParams: {
        id,
        action:'view'
      },
    });
  }

  addRoom(){
    this.router.navigate(['admin', 'rooms'], {
      queryParams: {
        action:'add'
      },
    });
  }
}
