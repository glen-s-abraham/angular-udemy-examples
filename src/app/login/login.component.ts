import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy{
  message:string='';
  name:string;
  password:string;
  subscription:Subscription;
  constructor(private authService:AuthService,private router:Router,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.subscription=this.authService.authResultEvent.subscribe(res=>{
      if(res){
        console.log(res);
        const url=this.activatedRoute.snapshot.queryParams['requested'];
        this.router.navigateByUrl(url)
      }else{
        this.message = `Invalid credentials`;
      }
    })
    this.authService.checkIfAuthenticated();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSubmit(){
    this.authService.authenticate(this.name,this.password);
  }
}
