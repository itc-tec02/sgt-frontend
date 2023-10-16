import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Trafo } from '../interfaces/trafo.inerface';

@Injectable({
  providedIn: 'root'
})
export class TrafoService {

  private readonly baseUrl: string = environment.baseUrl;

  private _trafos: Trafo[] = []

  constructor(private  http: HttpClient) {}

  getTrafos(): Observable<Trafo[]> {
    return this.http.get<Trafo[]>(`${this.baseUrl}/trafos`)
  }

  get trafos() {
    return this._trafos;
  }
}
