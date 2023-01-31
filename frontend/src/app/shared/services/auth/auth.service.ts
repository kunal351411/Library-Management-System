import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { User} from "src/app/shared/models/User.model";
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  adminUser: User = {
    "email": "admin@123.com",
    "password": "12345678"
  }

  constructor(
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  login(loginData: User): void
  {
    if(loginData.email === this.adminUser.email && loginData.password === this.adminUser.password)
    {
        console.log("login successful");

        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', loginData.email);
        this.snackbarService.openSnackBar("Logged In Successfully",'');
        this.router.navigate(['books']);    
    }
    else {
      alert("Login Failed: Email or Password is wrong");
    }
  }

  logout(): void
  {
      console.log("Logged out successfully");
      localStorage.setItem('isLoggedIn','false');    
      localStorage.removeItem('token');    
      this.snackbarService.openSnackBar("Logged out Successfully",'');
      this.router.navigate(['']);   
  }
}
