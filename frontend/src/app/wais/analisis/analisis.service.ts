import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {
  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http ) { }

  obtenerValorCritico(edad: number) {
    return this._http.get(this.url + '/valor-critico/valores-criticos?edad='+edad,
      this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  sonLas10SubpruebasPrincipales(idEvaluado: String) {
    return this._http.get(this.url + '/son-las-subpruebas-principales?idEvaluado='+idEvaluado,
      this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  seHizoRetencionDigitosYDisenoCubos(idEvaluado: String) {
    return this._http.get(this.url + '/se-hizo-retencion-digitos-y-diseno-cubos?idEvaluado='+idEvaluado,
      this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  edadEvaluado(idEvaluado: String) {
    return this._http.get(this.url + '/edad-evaluado?idEvaluado='+idEvaluado,
      this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }
}
