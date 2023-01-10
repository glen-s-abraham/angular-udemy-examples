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
  constructor(private dataService:DataService,private router:Router,private activatedRoute:ActivatedRoute){}
  ngOnInit(){
    this.users = this.dataService.users;
    this.activatedRoute.queryParams.subscribe(params=>{
      const {id} = params;
      if(id){
        this.currentUser = this.users.find(user=>user.id===+id);
      }
    })
  }
  setUserDetail(id:number){
    this.router.navigate(['admin','users'],{
      queryParams:{id}
    })
  }
}
