import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientXsrfModule , HttpErrorResponse } from '@angular/common/http';
import { Observable, map , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseApi } from './response';
// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  // baseApi:string = 'http://127.0.0.1:5001'
  baseApi:string = 'http://localhost:8000'
  apiUrl:string=''

  constructor(private http: HttpClient,) { }

  public setPo():Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/api/po'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, '', { headers });
  }

  public loadAnswer(): Observable<any> {
    this.apiUrl = this.baseApi + '/api/loadAnswer'
    return this.http.get<any>(this.apiUrl);
  }

  public uploadImage(file: File):Observable<any>{
    this.apiUrl = this.baseApi + '/api/uploadImage'
    const formData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  public loadListImage(type:string):Observable<any>{
    this.apiUrl = this.baseApi + '/api/loadListImage'
    const params = new HttpParams().set('type', type);
    return this.http.get<any>(this.apiUrl , { params });    
  }


  public deleteImage(pathfile: string): Observable<any> {
    this.apiUrl = `${this.baseApi}/api/deleteImage`;
    const params = new HttpParams()
      .set('pathfile', pathfile)
      // .set('userid', userId)
      ;
    return this.http.delete<any>(this.apiUrl, { params });
  }
}
