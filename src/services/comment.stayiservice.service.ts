import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

const baseURL = 'https://stayinsafe-api.azurewebsites.net';
@Injectable({
  providedIn: 'root'
})
export class CommentStayiserviceService {
  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Headers': 'Content-Type',
       'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
       'Authorization': 'my-auth-token'
    }),
  };
  constructor(private httpClient: HttpClient) { }
  createSite(comment: Comment): Observable<Comment> {
    console.log(JSON.stringify(comment));
    return (
      this.httpClient
        .post<Comment>(
          baseURL + '/api/Comentarios/AddComment',
          JSON.stringify(comment),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError))
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    console.log(err.message);
    return throwError(() => err);
  }
  
}

