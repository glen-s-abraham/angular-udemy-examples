import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input() user!:User
  @Output() dataChangedEvent= new EventEmitter();
  message:string='';
  constructor(private router:Router,private dataService:DataService){}
  editUser(){
    this.router.navigate(['admin','users'],{
      queryParams:{
        id:this.user.id,
        action:'edit'
      }
    })
  }
  deleteUser(){
    this.message = 'Deleting...';
    this.dataService.deleteUser(this.user.id).subscribe({next:next=>{
      this.dataChangedEvent.emit();
      this.router.navigate(['admin','users'])
    },
    error:err=>{
      this.message = 'Sorry this user cannot be deleted';
    }
  });
  }
}
