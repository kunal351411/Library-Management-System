import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './books.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from 'src/app/commons/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { BookComponent } from './book/book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { of, throwError } from 'rxjs';
import { MockComponent } from 'ng-mocks';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let bookComponent : BookComponent;

  const validBookData = {
                  name: "Test Book",
                  author: "Test admin",
                  price: 900,
  }

  let fakeSnackbarService: SnackbarService = jasmine.createSpyObj<SnackbarService>(
      'SnackbarService',
      {
        openSnackBar: undefined
      }
    );

    let fakeBooksService: BooksService = jasmine.createSpyObj<BooksService>(
      'BooksService',{
        addBook: of({
          success: true,
          message: "Book added",
          data: [{
                  id: 1,
                  name: "Test Book",
                  author: "Test admin",
                  price: 900,
                  imageUrl: 'https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg'
                }]
        }),
        getBookList: of({
          success:true,
          message: "Books retrieved",
          data: [{
      id: 1,
      name: "Test Book",
      author: "Test admin",
      price: 900,
      imageUrl: 'https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg'
    },
    {
      id: 2,
      name: "Test Book2",
      author: "Test admin2",
      price: 1000,
      imageUrl: 'https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg'
    }
  ]
        })
      }
    )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksComponent, NavbarComponent, MockComponent(BookComponent)],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule,MatToolbarModule, ReactiveFormsModule,
        MatDividerModule, MatFormFieldModule, MatInputModule, MatIconModule, BrowserAnimationsModule],
      providers: [{
        provide: SnackbarService, useValue: fakeSnackbarService
      },{
        provide: BooksService, useValue: fakeBooksService
      }
      ]  
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    component.books = [{
      id: 1,
      name: "Test Book",
      author: "Test admin",
      price: 900,
      imageUrl: 'https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg'
    },
    {
      id: 2,
      name: "Test Book2",
      author: "Test admin2",
      price: 1000,
      imageUrl: 'https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg'
    }
  ]
    fixture.detectChanges();

    const bookEl = fixture.debugElement.query(By.directive(BookComponent));
    bookComponent = bookEl.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render books equal to length of books array', () => {
    const bookComponents = fixture.debugElement.queryAll(By.css('app-book'));
    expect(bookComponents.length).toBe(2);
  });

  it('should call getBookList from service when getallBooks is called', () => {
      component.getBooks();
      expect(fakeBooksService.getBookList).toHaveBeenCalled();
  });

  it('should pass book to Book Component', () => {
    expect(bookComponent.book).toEqual(component.books[0]);
  })

  it('should show modal when AddBook is clicked', () => {
    expect(component.showModal).toBe(false);

    const addButton = fixture.debugElement.query(By.css('[data-testid="add-button"]'));
    addButton.nativeElement.click();
    
    expect(component.showModal).toBe(true);
  });

  it('should have submit button disabled until form gets valid', () => {
    const submitButton = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));

    expect(submitButton.properties['disabled']).toBe(true);

    component.bookForm.controls['name'].setValue(validBookData.name);
    component.bookForm.controls['author'].setValue(validBookData.author);
    component.bookForm.controls['price'].setValue(validBookData.price);
    fixture.detectChanges();

    expect(submitButton.properties['disabled']).toBe(false);
    
  });

  it('should be able to submit successfully for valid data', () => {
    spyOn(component, 'onAddBookSubmit');

    component.bookForm.controls['name'].setValue(validBookData.name);
    component.bookForm.controls['author'].setValue(validBookData.author);
    component.bookForm.controls['price'].setValue(validBookData.price);
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('[data-testid="submit-button"]')); 
    submitButton.nativeElement.click();
    expect(component.onAddBookSubmit).toHaveBeenCalled();
  });

  it('should call addBook() of Books Service when submitted', () => {
    spyOn(component, 'getBooks');
    
    component.bookForm.controls['name'].setValue(validBookData.name);
    component.bookForm.controls['author'].setValue(validBookData.author);
    component.bookForm.controls['price'].setValue(validBookData.price);
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('[data-testid="submit-button"]')); 
    submitButton.nativeElement.click();

    expect(fakeBooksService.addBook).toHaveBeenCalled();
    expect(fakeSnackbarService.openSnackBar).toHaveBeenCalledWith("Book Updated successfully", '');
    expect(component.getBooks).toHaveBeenCalled();
  });
  
  it('should have required error message for touched empty name field in form', () => {
    component.bookForm.controls['name'].setValue(null);
    component.bookForm.controls['name'].markAsTouched();
    fixture.detectChanges();

    const requiredNameErrorMessage = fixture.debugElement.query(By.css('[data-testid="name-required"]'));
    expect(requiredNameErrorMessage).toBeTruthy();

  });

   it('should have required error message for touched empty author field in form', () => {
    component.bookForm.controls['author'].setValue(null);
    component.bookForm.controls['author'].markAsTouched();
    fixture.detectChanges();

    const requiredAuthorErrorMessage = fixture.debugElement.query(By.css('[data-testid="author-required"]'));
    expect(requiredAuthorErrorMessage).toBeTruthy();

  });

  it('should have required error message for touched empty price field in form', () => {
    component.bookForm.controls['price'].setValue(null);
    component.bookForm.controls['price'].markAsTouched();
    fixture.detectChanges();

    const requiredPriceErrorMessage = fixture.debugElement.query(By.css('[data-testid="price-required"]'));
    expect(requiredPriceErrorMessage).toBeTruthy();
  });


  it('should not have any error messages if valid data is passed to form', () => {
    
    const errorMessages = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(errorMessages.length).toBe(0);
  })

  it('should close modal when onCloseModal is called', () => {
    expect(component.showModal).toBeTruthy;

    component.onCloseModal();
    fixture.detectChanges();

    expect(component.showModal).toBeFalsy();  
  });


});
