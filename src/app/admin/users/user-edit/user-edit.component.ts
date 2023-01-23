import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  @Input() user!: User;
  formUser!: User;
  message!: string;
  password!: string;
  password2!: string;
  nameIsValid!: boolean;
  @Output()
  dataChangedEvent = new EventEmitter();
  constructor(private dataService: DataService, private router: Router) {}
  onSubmit() {
    this.message = 'Saving...';
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe({
        next: (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], {
            queryParams: {
              id: user.id,
              action: 'view',
            },
          });
        },
        error: (err) => {
          this.message = 'Something went wrong please try again later';
        },
      });
    } else {
      this.dataService.updateUser(this.formUser).subscribe((user) => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'users'], {
          queryParams: {
            id: user.id,
            action: 'view',
          },
        });
      });
    }
  }

  ngOnInit() {
    this.formUser = { ...this.user };
    this.checkIfNameisValid();
  }

  checkIfNameisValid() {
    if (this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    }
  }
}
