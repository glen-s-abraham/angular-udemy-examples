import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/models/Room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
})
export class RoomDetailComponent {
  @Input() room!: Room;
  @Output() dataChangedEvent = new EventEmitter();

  message = '';

  constructor(private router: Router, private dataService: DataService) {}

  editRoom() {
    this.router.navigate(['admin', 'rooms'], {
      queryParams: {
        id: this.room.id,
        action: 'edit',
      },
    });
  }

  deleteRoom() {
    const result = confirm('Are you sure you widht to delete this room?');
    if (result) {
      this.message = 'Deleting....';
      this.dataService.deleteRoom(this.room.id).subscribe({
        next: (next) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'rooms']);
        },
        error: (err) => {
          console.log(err);
          this.message = 'Sorry this room cannot be deleted';
        },
      });
    }
  }
}
