import { EventEmitter, Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated =false;
  role:string;
  authResultEvent = new EventEmitter<boolean>();

  constructor(private dataService:DataService) { }
  authenticate(name:string,password:string){
    this.dataService.validateUser(name,password).subscribe({
      next:next=>{
        this.setupRole();
        this.isAuthenticated = true;
        this.authResultEvent.emit(true);
      },
      error:err=>{
        this.isAuthenticated = false;
        this.authResultEvent.emit(false);
      }
    });
  }

  setupRole(){
    this.dataService.getRole().subscribe(next=>{
      this.role = next.role;
    })
  }

  // getRole():string{
  //   if(this.jwtToken==null) return null;
  //   const encodedPayload = this.jwtToken.split('.')[1];
  //   const payload = atob(encodedPayload);
  //   return JSON.parse(payload).role;
  //   return 'ADMIN';
  // }

  checkIfAuthenticated(){
    this.dataService.getRole().subscribe(next=>{
      if(next.role!==''){
        this.isAuthenticated = true;
        this.authResultEvent.emit(true)
      }
    })
  }

  logout(){
    this.dataService.logout().subscribe();
    this.isAuthenticated = false;
  }
}
