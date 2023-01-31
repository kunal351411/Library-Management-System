import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { Book } from 'src/app/shared/models/Book.model';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() book: Book = {} as Book;

  mouseOvered: boolean = false;

  clickedBookId: string | null = null;
  clickedBookInfo: Book = {} as Book;
  bookCardInfo: Book = {} as Book;
  
  bookForm: FormGroup;
  showModal: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _booksService: BooksService,
    private _snackbarService: SnackbarService
  ) {
    this.bookForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      author: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      price: new FormControl(null),
      imageUrl: new FormControl(null),
    });
  }

  /**
   * When the component is mounted, Activated Route is used to get the current url. If null is
   * returned, it means, user is on books page and books card need to be rendered. Else if some 
   * id is returned, it means we need to render details of that id's book 
   */
  ngOnInit(): void {
    this.clickedBookId = this._route.snapshot.paramMap.get('id');
    if (this.clickedBookId !== null) {
      this.getBookById(parseFloat(this.clickedBookId));
    } else {
      this.bookCardInfo = this.book;
    }
  }

  /**
   * Function gets called when Edit Form is submitted. If values of form are valid, updated values are
   * passed to backend through service else alert is given to user regarding error
   */
  public onUpdateBookSubmit(): void {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);

      this._booksService.updateBook(this.bookForm.value).subscribe(
        (res: any) => {
          console.log('Updated book successfully');
          console.log(res);
          this._snackbarService.openSnackBar('Book Updated successfully', '');
          if (this.clickedBookId === null) {
            //console.log(this.clickedBookId);
            this.reloadComponent(['books']);
          } else this.reloadComponent(['books', this.clickedBookId]);
        },
        (err: any) => {
          console.log(err);
          if (err.error.message === 'Error updating the book: Validation error')
            alert('This book already exists');
          else alert('An error occurred while updating the book');
        }
      );

      this.bookForm.reset();
      this.onCloseModal();
    } else {
      let key = Object.keys(this.bookForm.controls);
      // console.log(key);

      key.filter((data) => {
        // console.log(data);
        let control = this.bookForm.controls[data];
        // console.log(control);
        if (control.errors != null) {
          control.markAsTouched();
        }
      });
    }
  }


  /**
   * Function opens edit form when clicked on Edit button. stopPropagation is used to
   * prevent click event from spreading the whole parent div that will open that book's details
   * @param book - Gives the current details of the book
   * @param event - MouseEvent object representing the click event
   */
  public onEditClick(book: Book, event: MouseEvent): void {
    console.log(book);
    event.stopPropagation();
    this.showModal = true;
    this.bookForm.patchValue(book);
  }

  /**
   * Function that redirects the user to details page of book when clicked on particular book card
   * @param book - Details of the book whose card is clicked
   */
  public onBookClick(book: Book): void {
    this._router.navigate(['books', book.id]);
  }


  /**
   * Function that fetches details of particular book from backend through the service
   * @param id - The id of the book whose details are required
   */
  public getBookById(id: number): void {
    this._booksService.getBookById(id).subscribe(
      (res: any) => {
        console.log(res);
        this.clickedBookInfo = res.data;
        this.bookCardInfo = this.clickedBookInfo;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Function that deletes particular book through the service. Opens confirm dialog and asks user for
   * confirmation
   * @param id - The id of the book to be deleted
   * @param event - MouseClick Event object passed to prevent spread of click simulation to parent div 
   */
  public  onDeleteBook(id: number, event: MouseEvent) {
    event.stopPropagation();
    if (confirm('Do you want to delete this book')) {
      this._booksService.deleteBook(id).subscribe(
        (res) => {
          console.log('Deleted successfully');
          this._snackbarService.openSnackBar('Book Deleted successfully', '');
          this.reloadComponent(['books']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  /**
   * Function that closes modal when close button is clicked
   */
  public onCloseModal() {
    this.showModal = false;
    this.bookForm.reset();
  }

  /**
   * Function that makes changes in router service so that reloading page can be done using 
   * navigate method
   * @param route  - Route of the component that is to be rendered
   */
  public reloadComponent(route: Array<string>) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(route);
  }
}
