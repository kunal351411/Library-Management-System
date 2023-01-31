import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){

  }

  canActivate(): boolean {
    if(this.isLoggedIn())
    {
      return true;
    }else 
    {
      this.router.navigate(['/login'])
      return false;
    }  
  }

  public isLoggedIn(): boolean {      
     let status = false;      
     if (localStorage.getItem('isLoggedIn') == "true") {      
        status = true;      
     }
       else {      
        status = false;      
        }      
     return status;      
     }    
  
}
