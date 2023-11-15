import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly baseUrl: string = environment.baseUrl;

  private _trafos: Usuario[] = []

  constructor(private  http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/users`)
  }

  get trafos() {
    return this._trafos;
  }
}
