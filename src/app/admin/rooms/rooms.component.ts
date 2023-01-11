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
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.dataService.getRooms().subscribe(rooms=>{this.rooms = rooms});
    this.activatedRoute.queryParams.subscribe((params) => {
      const { id } = params;
      if (id) {
        this.selectedRoom = this.rooms.find((room) => room.id === +id);
      }
    });
  }
  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {
      queryParams: {
        id,
      },
    });
  }
}
