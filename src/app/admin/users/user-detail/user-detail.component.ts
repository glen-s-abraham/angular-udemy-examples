import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  @Input() user!:User
  @Output() dataChangedEvent= new EventEmitter();
  message:string='';
  isAdminUser=false;
  constructor(private router:Router,private dataService:DataService,private authService:AuthService){}
  ngOnInit(): void {
    if(this.authService.role==='ADMIN') this.isAdminUser=true;
  }
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
