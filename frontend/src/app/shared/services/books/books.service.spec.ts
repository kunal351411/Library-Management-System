import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BooksService } from './books.service';

const expectedUrl = "http://localhost:3000/books";
const status = 500;
const statusText = 'Server error';
const errorEvent = new ErrorEvent('API error');
let actualError: HttpErrorResponse | undefined;

const bookDetails = {
       id: 1,
      name: "Test book",
      author: "Kunal",
      price: 800,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Draw_book.png'
};
const id=1;

describe('BooksService', () => {
  let booksService: BooksService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService]
    });
    booksService = TestBed.inject(BooksService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });


  it('should be created', () => {
    expect(booksService).toBeTruthy();
  });

  it('should add a book', () => {
    const response= {
      success: true,
      message: "Book added successfully",
      data: bookDetails
    }
    let actualBook: any;
    booksService.addBook(bookDetails).subscribe((receivedResponse) => {
      actualBook = receivedResponse.data;
    });

    controller.expectOne({
      method: 'POST',
      url: `${expectedUrl}/add`
    }).flush(response);

    expect(actualBook).toEqual(bookDetails);
  });

  it('should get all the books', () => {
    const response = {
      success: true,
      message: "All books retrieved successfully",
      data: [bookDetails]
    };

    let actualBooks: any;
    booksService.getBookList().subscribe((receivedResponse) => {
      actualBooks = receivedResponse.data;
    });

    controller.expectOne({
      method: 'GET',
      url: `${expectedUrl}/all`
    }).flush(response);

    expect(actualBooks).toEqual([bookDetails]);

  });

  it('should get a book by id', () => {

    const response = {
      success: true,
      message: "Found the book of given id",
      data: bookDetails
    };

    let actualBook: any;
    booksService.getBookById(id).subscribe((receivedResponse) => {
      actualBook = receivedResponse.data;
    });

    controller.expectOne({
      method: 'GET',
      url: `${expectedUrl}/${id}`
    }).flush(response);

    expect(actualBook).toEqual(bookDetails);
  });

  it("should update the book of given id", () => {
      const response = {
      success: true,
      message: "Found the book of given id",
      data: [1]
    };

    let actualResponse: any;
    booksService.updateBook(bookDetails).subscribe((receivedResponse) => {
      actualResponse = receivedResponse;
    });

    controller.expectOne({
      method: 'PUT',
      url: `${expectedUrl}/edit/${id}`
    }).flush(response);

    expect(actualResponse).toEqual(response);
  });

  
  it('should delete the book of given id', () => {
    const response = {
      success: true,
      message: "Deleted Book successfully",
    };

    let actualResponse: any;
    booksService.deleteBook(id).subscribe((receivedResponse) => {
      actualResponse = receivedResponse;
    });

    controller.expectOne({
      method: 'DELETE',
      url: `${expectedUrl}/delete/${id}`
    }).flush(response);

    expect(actualResponse).toEqual(response);
  });


  it('should pass post book error', () => {

    booksService.addBook(bookDetails).subscribe(
    () => {
      fail('next handler must not be called');
    },
    (error) => {
      actualError = error;
    },
    () => {
      fail('complete handler must not be called');
    },
  );
  controller.expectOne({
    method: "POST",
    url: `${expectedUrl}/add`
  }).error(
    errorEvent,
    { status, statusText }
  );

  if (!actualError) {
    throw new Error('Error needs to be defined');
  }
  expect(actualError.error).toBe(errorEvent);
  expect(actualError.status).toBe(status);
  expect(actualError.statusText).toBe(statusText);
  });


  it('should pass update book error', () => {

    booksService.updateBook(bookDetails).subscribe(
    () => {
      fail('next handler must not be called');
    },
    (error) => {
      actualError = error;
    },
    () => {
      fail('complete handler must not be called');
    },
  );
  controller.expectOne({
    method: "PUT",
    url: `${expectedUrl}/edit/${id}`
  }).error(
    errorEvent,
    { status, statusText }
  );

  if (!actualError) {
    throw new Error('Error needs to be defined');
  }
  expect(actualError.error).toBe(errorEvent);
  expect(actualError.status).toBe(status);
  expect(actualError.statusText).toBe(statusText);
  });


    it('should pass get all books error', () => {

    booksService.getBookList().subscribe(
    () => {
      fail('next handler must not be called');
    },
    (error) => {
      actualError = error;
    },
    () => {
      fail('complete handler must not be called');
    },
  );
  controller.expectOne({
    method: "GET",
    url: `${expectedUrl}/all`
  }).error(
    errorEvent,
    { status, statusText }
  );

  if (!actualError) {
    throw new Error('Error needs to be defined');
  }
  expect(actualError.error).toBe(errorEvent);
  expect(actualError.status).toBe(status);
  expect(actualError.statusText).toBe(statusText);
  });

   it('should pass get a book error', () => {

    booksService.getBookById(id).subscribe(
    () => {
      fail('next handler must not be called');
    },
    (error) => {
      actualError = error;
    },
    () => {
      fail('complete handler must not be called');
    },
  );
  controller.expectOne({
    method: "GET",
    url: `${expectedUrl}/${id}`
  }).error(
    errorEvent,
    { status, statusText }
  );

  if (!actualError) {
    throw new Error('Error needs to be defined');
  }
  expect(actualError.error).toBe(errorEvent);
  expect(actualError.status).toBe(status);
  expect(actualError.statusText).toBe(statusText);
  });


   it('should pass delete a book error', () => {

    booksService.deleteBook(id).subscribe(
    () => {
      fail('next handler must not be called');
    },
    (error) => {
      actualError = error;
    },
    () => {
      fail('complete handler must not be called');
    },
  );
  controller.expectOne({
    method: "DELETE",
    url: `${expectedUrl}/delete/${id}`
  }).error(
    errorEvent,
    { status, statusText }
  );

  if (!actualError) {
    throw new Error('Error needs to be defined');
  }
  expect(actualError.error).toBe(errorEvent);
  expect(actualError.status).toBe(status);
  expect(actualError.statusText).toBe(statusText);
  });

});








