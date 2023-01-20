import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users!:User[];
  currentUser!:User;
  action!:string;
  loadingData = true;
  message: string = 'Please wait...';
  reloadAttempts = 0;
  constructor(private dataService:DataService,private router:Router,private activatedRoute:ActivatedRoute){}
  loadData(){
    this.dataService.getUsers().subscribe({
      next:users=>{
        this.users = users;
        this.loadingData = false;
          this.processUrlsparams();
      },
      error:err=>{
        this.message = 'Sorry,something went wrong.Please trying again...';
        this.reloadAttempts++;
        if(this.reloadAttempts<=10) this.loadData();
        else  this.message = 'Sorry,something went wrong.Please contact support';
      },
    });
  }
  processUrlsparams(){
    this.activatedRoute.queryParams.subscribe(params=>{
      const {id,action} = params;
      this.action = action;
      if(id){
        this.currentUser = this.users.find(user=>user.id===+id);
      }
    })
  }
  ngOnInit(){
    this.loadData();
  }
  setUserDetail(id:number){
    this.router.navigate(['admin','users'],{
      queryParams:{id,action:'view'}
    })
  }

  addUser(){
    this.router.navigate(['admin','users'],{
      queryParams:{action:'add'}
    })
    this.currentUser = new User();
  }
}
