import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {  HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { Book} from "src/app/shared/models/Book.model";
import { Response } from 'src/app/shared/models/Response';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  bookForm: FormGroup;
  showModal: boolean = false;
  books: Book[] = [];
  mouseOvered: boolean = false;

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private snackbarService: SnackbarService
  ) {
    this.bookForm=new FormGroup({
      id: new FormControl(null),
    name: new FormControl(null),
    author: new FormControl(null),
    price: new FormControl(null),
    imageUrl: new FormControl(null),
    })
  }

  ngOnInit(): void {
      this.getBooks();
      this.bookForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        author: [null, [Validators.required, Validators.minLength(3)]],
        price: [null, Validators.required],
        imageUrl: [null],
      })
  }

  onAddBookSubmit(): void{
    if(this.bookForm.valid)
    { 
        if(this.bookForm.value.imageUrl === null)
            delete this.bookForm.value.imageUrl;

        this.booksService.addBook(this.bookForm.value).subscribe(
        (res: Response)=>{
          console.log("New Book Added successfully");
          console.log(res);
          this.snackbarService.openSnackBar("Book Updated successfully", '');
          this.getBooks();
        },
        (err: HttpErrorResponse)=>{
          console.log(err.error);
          
          if(err.error.message === 'Error adding new book: Validation error')
            alert('This book already exists'); 
          else 
          {
             alert('An error occurred while adding the book');
          } 
        }
      )
      this.bookForm.reset();
      this.onCloseModal();
      }
    else 
    {
       let key = Object.keys(this.bookForm.controls);
      // console.log(key);

      key.filter(data =>{
        // console.log(data);
        let control = this.bookForm.controls[data];
        // console.log(control);
        if(control.errors !=null){
          control.markAsTouched();
        }
      })
    }
}
  getBooks()
    {
      this.booksService.getBookList().subscribe((res: Response)=>{
        console.log(res);
        this.books = res.data;
      },(err: HttpErrorResponse)=>{
        console.log(err);
        
      })
    }
    
    onAddBook(){
    this.showModal = true;
  }

  onCloseModal(){
    this.showModal = false;
    this.bookForm.reset();
  }

}
