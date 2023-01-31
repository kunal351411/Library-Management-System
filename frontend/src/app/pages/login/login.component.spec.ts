import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fakeAuthService: AuthService = jasmine.createSpyObj<AuthService>(
      'AuthService',
      {
        login: void {

        },
        logout: undefined
      }
    );

  const validData = {
    email: 'admin@123.com',
    password: '12345678'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      providers: [{
        provide: AuthService, useValue: fakeAuthService
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have submit button disabled until form gets valid', () => {
    const submitButton = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));

    expect(submitButton.properties['disabled']).toBe(true);

    component.loginForm.controls['email'].setValue('admin@123.com');
    component.loginForm.controls['password'].setValue('admin@123.com');
    fixture.detectChanges();

    expect(submitButton.properties['disabled']).toBe(false);
    
  });

  it('should be able to submit successfully', () => {
    spyOn(component, 'onLoginSubmit');

    component.loginForm.controls['email'].setValue(validData.email);
    component.loginForm.controls['password'].setValue(validData.password);
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('[data-testid="submit-button"]')); 
    submitButton.nativeElement.click();
    expect(component.onLoginSubmit).toHaveBeenCalled();
  });

  it('should call login() of Auth Service when submitted', () => {
    
    component.loginForm.controls['email'].setValue(validData.email);
    component.loginForm.controls['password'].setValue(validData.password);
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('[data-testid="submit-button"]')); 
    submitButton.nativeElement.click();

    expect(fakeAuthService.login).toHaveBeenCalled();
    expect(fakeAuthService.login).toHaveBeenCalledWith(validData);
  });

  it('should toggle the password display on click', () => {
    component.loginForm.controls['password'].setValue(validData.password);
    const passwordField = fixture.debugElement.query(By.css('[data-testid="input-password"]'));
    expect(passwordField.attributes['type']).toBe('password');

    const toggleButton = fixture.debugElement.query(By.css('[data-testid="toggle-password"]'));
    toggleButton.nativeElement.click();
    fixture.detectChanges();

    expect(passwordField.attributes['type']).toBe('text');

    toggleButton.nativeElement.click();
    fixture.detectChanges();

    expect(passwordField.attributes['type']).toBe('password');
  })

  it('should not have error message for valid email', () => {
    component.loginForm.controls['email'].setValue(validData.email);
    component.loginForm.controls['email'].markAsTouched();
    fixture.detectChanges();
    const invalidEmailErrorMessage = fixture.debugElement.query(By.css('[data-testid="email-invalid"]'));
    expect(invalidEmailErrorMessage).toBeFalsy();

    const requiredEmailErrorMessage = fixture.debugElement.query(By.css('[data-testid="email-required"]'));
    expect(requiredEmailErrorMessage).toBeFalsy();
  })

  it('should not have error message for invalid email', () => {
    component.loginForm.controls['email'].setValue('invalid@');
    component.loginForm.controls['email'].markAsTouched();
    fixture.detectChanges();
    const invalidEmailErrorMessage = fixture.debugElement.query(By.css('[data-testid="email-invalid"]'));
    expect(invalidEmailErrorMessage).toBeTruthy();

    const requiredEmailErrorMessage = fixture.debugElement.query(By.css('[data-testid="email-required"]'));
    expect(requiredEmailErrorMessage).toBeFalsy();
  });

  it('should have required error message for touched empty email field', () => {
    component.loginForm.controls['email'].markAsTouched();
    fixture.detectChanges();
    const requiredEmailErrorMessage = fixture.debugElement.query(By.css('[data-testid="email-required"]'));
    expect(requiredEmailErrorMessage).toBeTruthy();

    const invalidEmailErrorMessage = fixture.debugElement.query(By.css('[data-testid="email-invalid"]'));
    expect(invalidEmailErrorMessage).toBeFalsy();
  });

  it('should have required error message for touched empty password field', () => {
    component.loginForm.controls['password'].markAsTouched();
    fixture.detectChanges();
    const requiredEmailErrorMessage = fixture.debugElement.query(By.css('[data-testid="password-required"]'));
    expect(requiredEmailErrorMessage).toBeTruthy();
  })

  it('should not have any error messages if valid data is passed', () => {
    component.loginForm.controls['email'].setValue(validData.email);
    component.loginForm.controls['password'].setValue(validData.password);
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(errorMessages.length).toBe(0);
  })

});
