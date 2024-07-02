import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientXsrfModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ResponseApi } from './response';
// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  apiUrl:string=''
  constructor(private http: HttpClient,) { }

  public setPo():Observable<ResponseApi> {
    this.apiUrl = 'http://127.0.0.1:5001/api/po'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, '', { headers });
  }

  public loadAnswer(): Observable<any> {
    this.apiUrl = 'http://127.0.0.1:5001/api/loadAnswer'
    return this.http.get<any>(this.apiUrl);
  }


}
