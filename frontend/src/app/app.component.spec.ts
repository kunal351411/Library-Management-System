import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commons/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** Smoke test to ensure that app component is created */
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  /** Smoke test to ensure that header component is created */
  it('should render the header component', () => {
    
    const header = fixture.debugElement.query(By.css('app-header'));
    expect(header).toBeTruthy();
    
  })
});
