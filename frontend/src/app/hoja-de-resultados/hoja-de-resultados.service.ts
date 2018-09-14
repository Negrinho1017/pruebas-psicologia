import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/';
import { EdadPersona } from '../model/EdadPersona';
import { Prueba } from '../model/Prueba';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HojaDeResultadosService {
  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http, private http: HttpClient ) { }

  obtenerEdadEvaluado(fechaNacimiento: String, fechaEvaluacion: String) {
    return this._http.get(this.url + '/edad?fechaNacimiento='+fechaNacimiento+'&fechaEvaluacion='
    +fechaEvaluacion, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }
  
  public crearPrueba(prueba: Prueba): Observable<Prueba> {
    return this.http.post<Prueba>(this.url + '/creacion-prueba', prueba);
  }
}
