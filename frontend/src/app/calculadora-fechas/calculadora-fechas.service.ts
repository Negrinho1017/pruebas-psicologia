import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/';
import { EdadPersona } from '../model/EdadPersona';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraFechasService {

  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http ) { }
  
  obtenerEdadEvaluado(fechaNacimiento: String, fechaEvaluacion: String) {
    return this._http.get(this.url + '/edad?fechaNacimiento='+fechaNacimiento+'&fechaEvaluacion='
    +fechaEvaluacion, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }
}
