import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService){

  }

  isAuthenticated(): boolean 
  {
      return localStorage.getItem('isLoggedIn') == "true"
  }

  logout(): void 
  {
      this.authService.logout();
  }
}
