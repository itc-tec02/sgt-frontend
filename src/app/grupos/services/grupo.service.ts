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

  getRTS(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/PATH`)
  }

  getPF(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/POS_FASE`)
  }

  getTCT(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/TIPCNXXFO`)
  }

  getTM(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/TIPMONTAJE`)
  }

  getTS(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/TIPSERV`)
  }

  getEFAO(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/EST_FLUJO`)
  }

  getET(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/EST_XFO`)
  }

  getFaT(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/FASES`)
  }

  getFET(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/FIL_ENSAYO`)
  }

  getFiT(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/FILTRO_XFO`)
  }

  getMarca(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/MARCA`)
  }

  getMB(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/MAT_BOBI`)
  }

  getModelo(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/MODELO`)
  }

  getPC(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/POSCONMU`)
  }

  getSAP(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/SA_PER`)
  }

  getSARE(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/SA_REC`)
  }

  getTNP(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/NIVTEN_MT`)
  }

  getTNS(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/NIVTEN_BT`)
  }

  getTF(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/TIP_FAB`)
  }

  getTI(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/TIP_IND`)
  }

  getTMCP(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/mantto/gpo/TIP_MED`)
  }

  get grupos() {
    return this._grupos;
  }
}
