import { HttpClient, HttpErrorResponse, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  public apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  get(endpoint: string, args?: any): Observable<any> {
    const params = this.serializeArgs(args);
    return this.http.get(`${this.apiUrl}/${endpoint}`, { params }).pipe(
      tap({
        next: response => { },
        error: error => {
          console.log('on error', error.message);
        },
        complete: () => { }
      })
    );
  }

  getById(endpoint: string, id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}/${id}`).pipe(
      tap({
        next: response => { },
        error: error => {
          console.log('on error', error.message);
        },
        complete: () => { }
      })
    );
  }

  post(endpoint: string, data?: any, id?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }

  put(endpoint: string, data?: any, id?: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${endpoint}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  private serializeArgs(args: any) {
    let params = new HttpParams({ encoder: new CustomHttpParamEncoder() });
    if (args) {
      Object.keys(args).forEach(
        (key) => {
          params = params.append(key, args[key]);
        }
      )
    }
    return params;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
