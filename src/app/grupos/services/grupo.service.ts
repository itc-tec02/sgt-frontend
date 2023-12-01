import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Grupo } from '../model/grupo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private readonly baseUrl: string = environment.baseUrl;

  private _grupos: Grupo[] = []

  constructor(private  http: HttpClient) {}

  getGrupos(value:String): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/${value}`)
  }
  //getById
  getGrupoById(value: string, id: string): Observable<Grupo>  {
    const url = `${this.baseUrl}/mantto/${value}/${id}`;
    return this.http.get<Grupo>(url);
  }

  //create
  createGrupo(value: string, cr:Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(`${this.baseUrl}/mantto/${value}/add`, cr)
  }

  //update
  updateGrupo(value: string, id: string, cr: Grupo): Observable<Grupo> {
    const url = `${this.baseUrl}/mantto/${value}/edit/${id}`;
    return this.http.put<Grupo>(url, cr);
  }
}
