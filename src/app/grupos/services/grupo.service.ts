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

  getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/grupos`)
  }

  get grupos() {
    return this._grupos;
  }
}
