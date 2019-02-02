import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prueba } from '../model/Prueba';

@Injectable({
  providedIn: 'root'
})
export class HojaDeSubpruebasService {
  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http, private http: HttpClient ) { }ñ

  public obtenerPruebaPorIdDelEvaluado(idEvaluado: string): Observable<Prueba>{
    const httpOptions = {
      params: new HttpParams().set('idEvaluado', idEvaluado)
    };
    return this.http.get<Prueba>(this.url + '/prueba-por-id', httpOptions);
  };
}
