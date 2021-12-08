import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import Swal from 'sweetalert2';

const baseURL = 'https://stayinsafe-api.azurewebsites.net';
@Injectable({
  providedIn: 'root',
})
export class ContactStayiserviceService {
  
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

  createUser(contact: Contact): Observable<Contact> {
    console.log(JSON.stringify(contact));
    return (
      this.httpClient
        .post<Contact>(
          baseURL + '/api/Contactos/AddContact',
          JSON.stringify(contact),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError))
    );
  }


  deleteContact(contact: Contact): Observable<Contact> {
    contact.id_Contacto=19
    console.log(JSON.stringify(contact.id));

    return this.httpClient.delete<any>(baseURL + '/api/Contactos/DeleteContact/'+`${ contact.id_Contacto }`);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // just a test ... more could would go here
    console.log(err.message);
    return throwError(() => err);
  }
}
