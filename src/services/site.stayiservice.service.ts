import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Site } from 'src/app/models/sitio.model';


const baseURL = 'https://stayinsafe-api.azurewebsites.net';
@Injectable({
  providedIn: 'root'
})
export class SiteStayiserviceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    }),
  };
  constructor(private httpClient: HttpClient) { }

  createSite(site: Site): Observable<Site> {
    console.log(JSON.stringify(site));
    return (
      this.httpClient
        .post<Site>(
          baseURL + '/api/Sitios',
          JSON.stringify(site),
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
