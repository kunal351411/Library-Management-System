import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private _authService: AuthService){

  }

  /**
   * Function that checks whether user is authenticated or not based on token in local storage
   * @returns true if user is authenticated otherwise false
   */
  public isAuthenticated(): boolean 
  {
      return localStorage.getItem('isLoggedIn') == "true"
  }


  /**
   * Function that logs the user out using the service
   */
  public logout(): void 
  {
      this._authService.logout();
  }
}
