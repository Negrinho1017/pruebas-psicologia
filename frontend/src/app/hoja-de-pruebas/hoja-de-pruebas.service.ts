import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prueba } from '../model/Prueba';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HojaDePruebasService {
  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http, private http: HttpClient ) { }

  public obtenerTodasLasPruebas(tipoPrueba: string): Observable<Prueba[]>{
    const httpOptions = {
      params: new HttpParams().set('tipoPrueba', tipoPrueba)
    };
    return this.http.get<Prueba[]>(this.url + '/obtener-todas-las-pruebas', httpOptions);
  }

  public obtenerPruebasPorNombre(tipoPrueba: string, nombre: string): Observable<Prueba[]>{
    const httpOptions = {
      params: new HttpParams().set('tipoPrueba', tipoPrueba).set('nombre', nombre)
    };
    return this.http.get<Prueba[]>(this.url + '/obtener-pruebas-por-nombre', httpOptions);
  }

  eliminarPrueba(idEvaluado: String): Observable<Prueba>{
    return this.http.delete<Prueba>(this.url + '/eliminar-prueba/'+idEvaluado, httpOptions);
  }
}
