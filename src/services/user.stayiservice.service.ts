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

    console.log(
      JSON.stringify({
        "id_Contacto": 4,
        "alias": "string",
        "telefono": 888,
        "email": "string",
        "id": 1
      })
    );

    return (
      this.httpClient
        .post<User>(
          baseURL + '/api/Contactos/AddContact',
         JSON.stringify({
          "id_Contacto": 5166,
          "alias": "Roberto Mejia",
          "telefono": 4776921217,
          "email": "string",
          "id": 1
        }),
          this.httpOptions
        )
        // return this.httpClient.post<User>(baseURL + '/employees', JSON.stringify(user), this.httpOptions)
        .pipe(retry(1), catchError(this.handleError))
    );
  }

  getRepos(user: User): Observable<User> {
    console.log(JSON.stringify(user));
    return this.httpClient.post<User>(
      baseURL + '/employees',
      JSON.stringify(user),
      this.httpOptions
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // just a test ... more could would go here
    console.log(err.message);
    Swal.fire({
      title: 'Ha ocurrido un error :(',
      text: err.message,
      confirmButtonText: 'Aceptar',
      position: 'bottom',
      confirmButtonColor: '#30313a',
      imageUrl: 'assets/images/error.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom image',
    });
    return throwError(() => err);
  }
}
