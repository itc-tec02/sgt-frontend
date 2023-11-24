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
  getCrsById(id: string): Observable<Cr>  {
    const url = `${this.baseUrl}/mantto/pn/${id}`;
    return this.http.get<Cr>(url);
  }

  getAdmById(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/adm`)
  }

  getAlmById(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/alm`)
  }

  getCoiById(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/coi`)
  }

  getCptById(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/cpt`)
  }

  getOmrById(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/omr`)
  }

  //create
  createCr(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/cr`)
  }

  createAdm(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/adm`)
  }

  createAlm(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/alm`)
  }

  createCoi(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/coi`)
  }

  createCpt(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/cpt`)
  }

  createOmr(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/omr`)
  }

  //update
  updateCr(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/cr`)
  }

  updateAdm(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/adm`)
  }

  updateAlm(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/alm`)
  }

  updateCoi(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/coi`)
  }

  updateCpt(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/cpt`)
  }

  updateOmr(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/omr`)
  }
}
