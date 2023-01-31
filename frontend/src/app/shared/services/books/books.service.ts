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

  constructor(private _http: HttpClient) { }

  /**
   * Function that sends a POST request to server to add new book 
   * @param book - The details of the new book to be added in database
   * @returns Observable Response object containing details of the book added  
   *           received from server
   */
  public addBook(book: Book): Observable<Response>
   {
      return this._http.post<Response>(`${this.baseUrl}/add`,book);
   }


   /**
   * Function that sends a GET request to server to fetch all the book records
   * @param 
   * @returns Observable Response object containing list of all book records 
   *           received from server
   */
   public getBookList(): Observable<Response>
   {
      return this._http.get<Response>(`${this.baseUrl}/all`)
   }


   /**
   * Function that sends a GET request to server to fetch details of a particular book
   * @param id - The id of the book whose details are to be fetched
   * @returns Observable Response object containing details of the book record 
   *          fetched from server
   */
   public getBookById(id: number): Observable<Response>
   {
      return this._http.get<Response>(`${this.baseUrl}/${id}`)
   }


   /**
   * Function that sends a DELETE request to server to delete details of a particular book
   * @param id - The id of the book whose details are to be deleted
   * @returns Observable Response object containing number of book records
   *         deleted from the server
   */
   public deleteBook(id: number)
   {
      return this._http.delete(`${this.baseUrl}/delete/${id}`)
   }


   /**
   * Function that sends a PUT request to server to update details of a particular book
   * @param id - The id of the book whose details are to be updated
   * @returns Observable Response object containing number of book records
   *          updated to  server
   */
   public updateBook(book: Book)
   {
      return this._http.put(`${this.baseUrl}/edit/${book.id}`,book)
   }
}
