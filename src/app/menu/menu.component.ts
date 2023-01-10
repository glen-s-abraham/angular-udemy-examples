import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private router: Router) {}
  navigateTo(url:string){
    //use the router module's navigate function to change pages without refresh
    //bind the same to click events on corresponding html elements
    this.router.navigate(url.split('/'))
  }
}
