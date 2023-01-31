import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(status: string, message: string): void {
    this._snackBar.open(status, message, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000
    });
  }
}
