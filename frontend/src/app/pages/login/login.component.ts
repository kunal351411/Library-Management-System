import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Function that gets called when user submits login form. If the form values are valid,
   * the details are passed to login service else marked as touched to show error message
   */
  public onLoginSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._authService.login(this.loginForm.value);
      this.loginForm.reset();
    } else {
     
      let key = Object.keys(this.loginForm.controls);
      // console.log(key);

      key.filter((data) => {
        // console.log(data);
        let control = this.loginForm.controls[data];
        // console.log(control);
        if (control.errors != null) {
          control.markAsTouched();
        }
      });
    }
  }
}
