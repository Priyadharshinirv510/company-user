import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl: any;
  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3030/';
  }

  postData(url: any, data: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${this.apiUrl}${url}`, data, {
        headers: headers,
      })
      .pipe(map((response) => response));
  }

  postDataWithParam(url: any, obj: any, data: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let httpParam = new HttpParams();
    Object.keys(obj).forEach((key) => {
      httpParam = httpParam.set(key, obj[key]);
    });
    return this.http
      .post(`${this.apiUrl}${url}?${httpParam}`, data, {
        headers: headers,
      })
      .pipe(map((response) => response));
  }

  getData(url: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .get(`${this.apiUrl}${url}`, { headers: headers })
      .pipe(map((res) => res));
  }
  
  getDataWithParam(url: any, obj: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let httpParams = new HttpParams();
    Object.keys(obj).forEach((key) => {
      httpParams = httpParams.set(key, obj[key]);
    });
    return this.http
      .get(`${this.apiUrl}${url}?${httpParams}`, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  putData(url: any, data: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put(`${this.apiUrl}${url}`, data, {
        headers: headers,
      })
      .pipe(map((response) => response));
  }

}
