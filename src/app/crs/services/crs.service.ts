import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Cr } from '../model/cr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrsService {

  private readonly baseUrl: string = environment.baseUrl;

  private _crs: Cr[] = []

  constructor(private  http: HttpClient) {}

  //get
  getCrs(value:string): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/${value}`)
  }

  //getById
  getCrById(value: string, id: string): Observable<Cr>  {
    const url = `${this.baseUrl}/mantto/${value}/${id}`;
    return this.http.get<Cr>(url);
  }

  //create
  createCr(value: string, cr:Cr): Observable<Cr> {
    return this.http.post<Cr>(`${this.baseUrl}/mantto/${value}/add`, cr)
  }

  //update
  updateCr(value: string, id: string, cr: Cr): Observable<Cr> {
    const url = `${this.baseUrl}/mantto/${value}/edit/${id}`;
    return this.http.put<Cr>(url, cr);
  }
}
