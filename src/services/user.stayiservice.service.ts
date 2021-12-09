import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

const baseURL ='https://stayinsafe-api.azurewebsites.net';
const loginBaseURL = 'https://stayinsafe-login.azurewebsites.net'
@Injectable({
  providedIn: 'root',
})
export class UserStayiserviceService {
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Headers': 'Content-Type',
       'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    }),
  };
  constructor(private httpClient: HttpClient) {}

  // HttpClient API post() method => Create employee
  createUser(user: User): Observable<User> {
    console.log(JSON.stringify(user));
    return (
      this.httpClient
        .post<User>(
          baseURL + '/api/User/Register',
         JSON.stringify(user),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError))
    );
  }

  login(user: User): Observable<User> {
    console.log(JSON.stringify(user));
    return this.httpClient.post<User>(
      loginBaseURL + '/Login',
      JSON.stringify(user),
      this.httpOptions
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    console.log(err.message);
    return throwError(() => err);
  }
}
