import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { By } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './header.component';
import { LoginComponent } from 'src/app/pages/login/login.component';

import { AuthService } from 'src/app/shared/services/auth/auth.service';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  let fakeAuthService: Pick<AuthService, keyof AuthService> = {
    logout(){
      component.isAuthenticated = () => false;
      router.navigate(['']);
    },
    login() {},
    adminUser: {
      email: "",
      password: ""
    },
  }

  /** Fake routes for Router Testing Module */
  const routes: Routes = [
    {path: '', component: HeaderComponent},
    {path: 'login', component: LoginComponent},
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatSnackBarModule, RouterTestingModule.withRoutes(routes)],
      declarations: [ HeaderComponent],
      providers: [Router, {
        provide: AuthService, useValue: fakeAuthService
      }]
    })
    .compileComponents();
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header', () => {
    expect(component).toBeTruthy();
  });

  it('should render Mat Toolbar', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
  });

  it('should have Online Library Management System as heading', ()=> {
    const heading = fixture.debugElement.query(By.css('strong'));
    expect(heading.nativeElement.textContent).toContain('Online Library Management System')
  });

  it('should have login button if not authenticated', () => {
    component.isAuthenticated = () => false;
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('button'));
    expect(loginButton.nativeElement.textContent).toContain('Login');
  });

  it('should redirect to Login page when login button clicked', async () => {
    component.isAuthenticated = () => false;
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('button'));
    loginButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(router.url).toBe('/login');
    
  });

  it('should have logout button if authenticated', () => {
    component.isAuthenticated = () => true;
    fixture.detectChanges();
    const logoutButton = fixture.debugElement.query(By.css('button'));
    expect(logoutButton.nativeElement.textContent).toContain('Logout');
  });

  it('should call logout function when logout button clicked', () => {
    component.isAuthenticated = () => true;
    fixture.detectChanges();
    spyOn(component, 'logout');
    const logoutButton = fixture.debugElement.query(By.css('button'));
    logoutButton.nativeElement.click();
    expect(component.logout).toHaveBeenCalled();
  });

  it('should call logout from authService when logout button clicked', () => {
    component.isAuthenticated = () => true;
    fixture.detectChanges();

    spyOn(fakeAuthService, 'logout');
    const logoutButton = fixture.debugElement.query(By.css('button'));
    logoutButton.nativeElement.click();

    expect(fakeAuthService.logout).toHaveBeenCalled();
  })

});
