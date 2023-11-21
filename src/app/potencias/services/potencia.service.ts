import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Potencia } from '../model/potencia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PotenciaService {

  private readonly baseUrl: string = environment.baseUrl;

  private _potencias: Potencia[] = []

  constructor(private  http: HttpClient) {}

  getPotencias(): Observable<Potencia[]> {
    return this.http.get<Potencia[]>(`${this.baseUrl}/mantto/pn`)
  }

  get potencias() {
    return this._potencias;
  }

  agregarPotencia(potencia: Potencia): Observable<Potencia> {
    return this.http.post<Potencia>(`${this.baseUrl}/mantto/pn`, potencia);
  }

  actualizarPotencia(id: string, potencia: Potencia): Observable<Potencia> {
    const url = `${this.baseUrl}/mantto/pn/${id}`;
    return this.http.put<Potencia>(url, potencia);
  }

  getById(id: string): Observable<Potencia> {
    const url = `${this.baseUrl}/mantto/pn/${id}`;
    return this.http.get<Potencia>(url)
  }

  delete(id: any): Observable<Potencia> {
    return this.http.delete<Potencia>(`${this.baseUrl}/mantto/pn/${id}`);
  }
}
