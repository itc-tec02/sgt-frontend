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

  getCrs(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/cr`)
  }

  getAdm(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/adm`)
  }

  getAlm(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/alm`)
  }

  getCoi(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/coi`)
  }

  getCpt(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/cpt`)
  }

  getOmr(): Observable<Cr[]> {
    return this.http.get<Cr[]>(`${this.baseUrl}/mantto/omr`)
  }

  get puestos() {
    return this._crs;
  }
}
