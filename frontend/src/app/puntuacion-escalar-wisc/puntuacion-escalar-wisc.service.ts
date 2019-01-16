import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PuntuacionEscalarWiscService {

  private url = "http://localhost:8080";
  constructor( private _http: Http, private http: HttpClient ) { }

  public obtenerPuntuacionEscalarDisenoCubos(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/diseno-cubos?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }
}
