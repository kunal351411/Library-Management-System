import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatImportsModule } from './mat-imports/mat-imports.module';

import { AppComponent } from './app.component';
import { BooksComponent } from './pages/books/books.component';
import { BookComponent } from './pages/books/book/book.component';
import { HeaderComponent } from './commons/header/header.component'
import { NavbarComponent } from './commons/navbar/navbar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    HeaderComponent,
    NavbarComponent,
    LandingPageComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatImportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
