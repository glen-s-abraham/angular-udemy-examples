import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Room } from 'src/app/models/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms!: Room[];
  selectedRoom!: Room;
  action: string;
  loadingData: boolean = true;
  reloadAttempts:number=0;
  message: string = 'Please wait...';
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formResetService: FormResetService
  ) {}

  loadData() {
    this.dataService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.loadingData = false;
        this.processUrlsparams();
      },
      error: (err) => {
        this.message = 'Sorry,something went wrong.Please trying again...';
        this.reloadAttempts++;
        if(this.reloadAttempts<=10) this.loadData();
        else  this.message = 'Sorry,something went wrong.Please contact support';
      },
    });
  }

  processUrlsparams(){
    this.activatedRoute.queryParams.subscribe((params) => {
      const { id } = params;
      this.action = params['action'];
      if (id) {
        this.selectedRoom = this.rooms.find((room) => room.id === +id);
      }
      if (this.action === 'add') {
        this.selectedRoom = new Room();
        this.action = 'edit';
        this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
      }
    });
  }
  ngOnInit() {
    this.loadData();
  }

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {
      queryParams: {
        id,
        action: 'view',
      },
    });
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], {
      queryParams: {
        action: 'add',
      },
    });
  }
}
