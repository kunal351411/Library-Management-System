import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from 'src/app/commons/navbar/navbar.component';
import { By } from '@angular/platform-browser';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { of } from 'rxjs';


describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

   let fakeSnackbarService: SnackbarService = jasmine.createSpyObj<SnackbarService>(
      'SnackbarService',
      {
        openSnackBar: undefined
      }
    );

    let fakeBooksService: BooksService = jasmine.createSpyObj<BooksService>(
      'BooksService',{
        updateBook: of({
          success:true,
          message:"Book Updated"
        }),
        deleteBook: of({
          success:true,
          message:"Book Deleted"
        }),
        getBookById: of({
          success: true,
          message: "Book retrieved",
          data: [{
                  id: 1,
                  name: "Test Book",
                  author: "Test admin",
                  price: 900,
                  imageUrl: 'https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg'
                }]
        })
      }
    )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent, NavbarComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, MatToolbarModule,
        MatDividerModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [{
        provide: SnackbarService, useValue: fakeSnackbarService
      },{
        provide: BooksService, useValue: fakeBooksService
      }
      ]  
    })
    .compileComponents();
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = {
      id: 1,
      name: "Test Book",
      author: "Test admin",
      price: 900,
      imageUrl: 'https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg'
    }
    component.bookCardInfo = component.book; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render book card when clickedBookId is null', () => {
    component.clickedBookId= null;
    const bookCard = fixture.debugElement.query(By.css('[data-testid="book-card"]'));
    expect(bookCard).toBeTruthy();

    const bookDetails = fixture.debugElement.query(By.css('[data-testid="book-details"]'));
    expect(bookDetails).toBeFalsy();
  });


  it('should render book card when clickedBookId is defined', () => {
    component.clickedBookId= '1';
    fixture.detectChanges();
    const bookCard = fixture.debugElement.query(By.css('[data-testid="book-card"]'));
    expect(bookCard).toBeFalsy();

    const bookDetails = fixture.debugElement.query(By.css('[data-testid="book-details"]'));
    expect(bookDetails).toBeTruthy();
  });

  it('should render book details when book card is clicked', ()=>{
    spyOn(component, 'onBookClick');

    component.clickedBookId = null;
    const bookCard = fixture.debugElement.query(By.css('[data-testid="book-card"]'));
    bookCard.nativeElement.click();
    fixture.detectChanges();

    expect(component.onBookClick).toHaveBeenCalledWith(component.bookCardInfo);
  });

  it('should call getBookById from service when getBookById is called', ()=>{
      
    component.getBookById(component.bookCardInfo.id);

    expect(fakeBooksService.getBookById).toHaveBeenCalled();
  });

  it('should close modal when onCloseModal called', ()=>{
      
    component.onCloseModal();
    expect(component.showModal).toBe(false);
  });

  it('should open modal when onEditClick is called', () => {
    const ev = new MouseEvent('click');
    spyOn(ev,'stopPropagation');

    component.onEditClick(component.bookCardInfo, ev);

    expect(component.showModal).toBe(true);
    expect(ev.stopPropagation).toHaveBeenCalled();
    expect(component.bookForm.value).toEqual(component.bookCardInfo)
  });

  it('should call onDeleteBook when delete button is clicked', async() => {
    spyOn(component, "onDeleteBook");
  
    const deleteButton = fixture.debugElement.query(By.css('[data-testid="delete-button"]'));
    deleteButton.triggerEventHandler('click', {});
    expect(component.onDeleteBook).toHaveBeenCalled();
  });

  it('should delete book when onDeleteBook is called', () => {
    const ev = new MouseEvent('click');
    spyOn(ev,'stopPropagation');
    spyOn(component, 'reloadComponent');
    spyOn(window, "confirm").and.returnValue(true)

    component.onDeleteBook(component.bookCardInfo.id, ev);

    expect(ev.stopPropagation).toHaveBeenCalled();
    expect(window.confirm).toHaveBeenCalled();
    expect(fakeBooksService.deleteBook).toHaveBeenCalledWith(component.bookCardInfo.id);
    expect(fakeSnackbarService.openSnackBar).toHaveBeenCalledWith("Book Deleted successfully", '');
    expect(component.reloadComponent).toHaveBeenCalledWith(['books']);
  });

  it('should call onUpdateBookSubmit when submit button is clicked', async() => {
    component.showModal = true;
    component.bookForm.controls['name'].setValue(component.bookCardInfo.name);
    component.bookForm.controls['author'].setValue(component.bookCardInfo.author);
    component.bookForm.controls['price'].setValue(component.bookCardInfo.price);
    fixture.detectChanges();
    spyOn(component, 'onUpdateBookSubmit');

    const updateButton = fixture.debugElement.query(By.css('[data-testid="update-button"]'));
    updateButton.nativeElement.click();
    expect(updateButton.nativeElement).toBeTruthy();
    expect(component.onUpdateBookSubmit).toHaveBeenCalled();
  });

  it('should upadte book on update click ', () => {
    spyOn(component,'onCloseModal')
    spyOn(component, 'reloadComponent');
    component.bookForm.controls['name'].setValue(component.bookCardInfo.name);
    component.bookForm.controls['author'].setValue(component.bookCardInfo.author);
    component.bookForm.controls['price'].setValue(component.bookCardInfo.price);
    fixture.detectChanges();

    const updateButton = fixture.debugElement.query(By.css('[data-testid="update-button"]'));
    updateButton.nativeElement.click();

    expect(fakeBooksService.updateBook).toHaveBeenCalled();
    expect(fakeSnackbarService.openSnackBar).toHaveBeenCalledWith("Book Updated successfully", '');
    expect(component.reloadComponent).toHaveBeenCalled();
    expect(component.onCloseModal).toHaveBeenCalled();
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

});
