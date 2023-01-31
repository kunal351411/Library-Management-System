import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Book } from 'src/app/shared/models/Book.model';
import { BooksService } from 'src/app/shared/services/books/books.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  
  mouseOvered: boolean = false;
  clickedBookId: string | null = null;
  clickedBookInfo: Book = {} as Book;
  bookCardInfo: Book = {} as Book;
  bookForm: FormGroup;
  showModal: boolean = false;

  @Input() book: Book = {} as Book;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private booksService: BooksService,
    private snackbarService: SnackbarService,
    ) {
      this.bookForm=new FormGroup({
        id: new FormControl(null),
      name: new FormControl(null,[Validators.required,Validators.minLength(3)]),
      author: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      price: new FormControl(null),
      imageUrl: new FormControl(null),
    })
    }

  ngOnInit(): void {
    this.clickedBookId = this.route.snapshot.paramMap.get('id');
    if(this.clickedBookId!==null)
    {
        this.getBookById(parseFloat(this.clickedBookId));  
    }
    else
    {
        this.bookCardInfo = this.book;    
    }
  }

  onUpdateBookSubmit(): void
  {
    if(this.bookForm.valid)
    {
        console.log(this.bookForm.value);
      
      this.booksService.updateBook(this.bookForm.value).subscribe(
        (res: any)=>{
          console.log("Updated book successfully");
          console.log(res);
          this.snackbarService.openSnackBar("Book Updated successfully", ''); 
          if(this.clickedBookId === null){
            //console.log(this.clickedBookId);
            this.reloadComponent(['books']);
          }
          else
            this.reloadComponent(['books', this.clickedBookId]);
        },
        (err: any)=>{
          console.log(err);
          if(err.error.message === 'Error updating the book: Validation error')
            alert('This book already exists');
          else 
            alert('An error occurred while updating the book');   
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

  onEditClick(book: Book, event: MouseEvent): void
  {
    console.log(book);
    event.stopPropagation();
    this.showModal=true;
    this.bookForm.patchValue(book);
  }

  onBookClick(book: Book): void
  {
    this.router.navigate(['books', book.id])
  }

  getBookById(id: number): void
  {
      this.booksService.getBookById(id).subscribe((res: any)=>{
        console.log(res);
        this.clickedBookInfo = res.data;  
        this.bookCardInfo = this.clickedBookInfo; 
      },(err)=>{
        console.log(err);  
      })
  }

  onDeleteBook(id:number, event: MouseEvent)
    {
      event.stopPropagation();
      if(confirm("Do you want to delete this book"))
      {
        this.booksService.deleteBook(id).subscribe((res)=>{
        console.log("Deleted successfully");
        this.snackbarService.openSnackBar("Book Deleted successfully", '');  
        this.reloadComponent(['books']);
      },(err)=>{
        console.log(err);
      })
      }
    }

    onCloseModal(){
    this.showModal = false;
    this.bookForm.reset();
  }

  reloadComponent(route: Array<string>)
  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(route);
  }
  
}
