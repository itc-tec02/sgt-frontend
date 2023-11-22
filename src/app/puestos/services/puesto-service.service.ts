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

  create(puesto: Puesto): Observable<Puesto> {
    return this.http.post<Puesto>(`${this.baseUrl}/puestos`, puesto);
  }

  update(id: string, puesto: Puesto): Observable<Puesto> {
    const url = `${this.baseUrl}/puestos/${id}`;
    return this.http.put<Puesto>(url, puesto);
  }

  getById(id: string): Observable<Puesto> {
    const url = `${this.baseUrl}/puestos/${id}`;
    return this.http.get<Puesto>(url)
  }

  delete(id: any): Observable<Puesto> {
    return this.http.delete<Puesto>(`${this.baseUrl}/puestos/${id}`);
  }
}
