import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
    
    constructor(private _router: Router) {

      /** If the user is already logged in, he is redirected to Books Page instead of landing page */
      if(localStorage.getItem('isLoggedIn') == "true")
        this._router.navigate(['/books']);
    }    
}