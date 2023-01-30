import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{
  isLoggedIn=false;
  constructor(private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    console.log(this.authService)
    this.authService.authResultEvent.subscribe(next=>this.isLoggedIn=next)
  }

  navigateTo(url:string){
    //use the router module's navigate function to change pages without refresh
    //bind the same to click events on corresponding html elements
    this.router.navigate(url.split('/'))
  }

  logout(){
    this.authService.logout();
    this.router.navigate([''])
  }
}
