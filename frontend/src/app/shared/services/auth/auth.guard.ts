import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router){

  }

  /**
   * Function that checks whether a user can access a particular route or not based on whether
   * he is logged in or not. If not logged in, the user is redirected to Login page
   * @returns whether the user can access the given route
   */
  public canActivate(): boolean {
    if(this.isLoggedIn())
    {
      return true;
    }else 
    {
      this._router.navigate(['/login'])
      return false;
    }  
  }


  /**
   * Function that uses localStorage to find whether user is logged in or not
   * @returns login status of the user
   */
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
