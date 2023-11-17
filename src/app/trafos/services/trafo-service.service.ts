import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  agregarTrafo(trafo: Trafo): Observable<Trafo> {
    return this.http.post<Trafo>(`${this.baseUrl}/trafos`,trafo).pipe(
      tap((nuevoTrafo: Trafo) => {
        this._trafos.push(nuevoTrafo);
      })
    );
  }
}
