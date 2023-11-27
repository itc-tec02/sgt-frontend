import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Orden } from '../interfaces/ott.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OttService {

  private readonly baseUrl: string = environment.baseUrl;

  private _orden: Orden[] = [];

  constructor(private  http: HttpClient) { }

  getOtts(userId: string): Observable<Orden[]> {
    const params = new HttpParams().set('userId',userId);
    return this.http.get<Orden[]>(`${this.baseUrl}/orders`, { params })
  }

  get otts() {
    return this._orden;
  }

  getById(id: string): Observable<Orden> {
    const url = `${this.baseUrl}/orders/${id}`;
    return this.http.get<Orden>(url)
  }

  create(ott: Orden): Observable<Orden> {
    return this.http.post<Orden>(`${this.baseUrl}/ott`, ott);
  }

  update(id: string, ott: Orden): Observable<Orden> {
    const url = `${this.baseUrl}/ott/${id}`;
    return this.http.put<Orden>(url, ott);
  }

}
