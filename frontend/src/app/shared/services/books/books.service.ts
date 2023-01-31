import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'src/app/shared/models/Book.model';
import { Response } from '../../models/Response';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseUrl: string = "http://localhost:3000/books";

  constructor(private http: HttpClient) { }

  addBook(book: Book): Observable<Response>
   {
      return this.http.post<Response>(`${this.baseUrl}/add`,book);
   }

   getBookList(): Observable<Response>
   {
      return this.http.get<Response>(`${this.baseUrl}/all`)
   }

   getBookById(id: number): Observable<Response>
   {
      return this.http.get<Response>(`${this.baseUrl}/${id}`)
   }

   deleteBook(id: number)
   {
      return this.http.delete(`${this.baseUrl}/delete/${id}`)
   }

   updateBook(book: Book)
   {
      return this.http.put(`${this.baseUrl}/edit/${book.id}`,book)
   }
}
