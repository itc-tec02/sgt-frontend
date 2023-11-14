import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Puesto } from '../interface/puesto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private readonly baseUrl: string = environment.baseUrl;

  private _puestos: Puesto[] = []

  constructor(private  http: HttpClient) {}

  getPuestos(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(`${this.baseUrl}/puestos`)
  }

  get puestos() {
    return this._puestos;
  }
}
