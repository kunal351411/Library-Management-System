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

  /**
   * Function that opens snackbar using MatSnackBar service of Material  
   * @param status - The status of the action to be displayed using snackbar like "Deleted successfully"
   * @param message - The extra message to be displayed on right end of snackbar
   */
  openSnackBar(status: string, message: string): void {
    this._snackBar.open(status, message, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000
    });
  }
}
