import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './pages/books/books.component';
import { BookComponent } from './pages/books/book/book.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { AuthGuard } from './shared/services/auth/auth.guard';

const routes: Routes = [
  {
    path: "", component: LandingPageComponent,
  },
  {
    path: "login", component: LoginComponent,
  },
  {
    path: "books", component: BooksComponent, canActivate:[AuthGuard]
  },
  {
    path: "books/:id", component: BookComponent, canActivate:[AuthGuard]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
