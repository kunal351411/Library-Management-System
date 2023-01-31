import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeRouter: Router = jasmine.createSpyObj<Router>(
    'Router',{
      navigate: undefined
    }
  );
  let fakeSnackbarService: SnackbarService = jasmine.createSpyObj<SnackbarService>(
      'SnackbarService',
      {
        openSnackBar: undefined
      }
    );


  const VALID_LOGIN_DATA = {
    email: 'admin@123.com',
    password: '12345678'
  }
  const INVALID_LOGIN_DATA = {
    email: 'admin@1.com',
    password: '123456'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule,],
      providers: [{
        provide: SnackbarService, useValue: fakeSnackbarService
      },{
        provide: Router, useValue: fakeRouter
      }]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login the user for valid login data', () => {
    spyOn(localStorage, 'setItem');
    service.login(VALID_LOGIN_DATA);

    expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', "true");
    expect(localStorage.setItem).toHaveBeenCalledWith('token', VALID_LOGIN_DATA.email);

    expect(fakeSnackbarService.openSnackBar).toHaveBeenCalledWith("Logged In Successfully",'');

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['books']);
  });

  it('should show alert for invalid login data', () => {
    spyOn(window, 'alert');

    service.login(INVALID_LOGIN_DATA);

    expect(window.alert).toHaveBeenCalledWith('Login Failed: Email or Password is wrong');
  });

  it('should logout the user', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'removeItem');

    service.logout();

    expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', "false");
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');

    expect(fakeSnackbarService.openSnackBar).toHaveBeenCalledWith("Logged out Successfully",'');

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['']);
  })
});
