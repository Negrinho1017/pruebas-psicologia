import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Prueba } from '../../model/Prueba';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subprueba } from '../../model/Subprueba';

@Injectable({
  providedIn: 'root'
})
export class AnalisisProcesoService {
  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http, private http: HttpClient ) { }

  obtenerDisenoCubosSinBonificacionPorTiempo(idEvaluado: String){
    return this._http.get(this.url + '/analisis-proceso/diseno-cubos-sin-bonificacion-tiempo?idEvaluado='+idEvaluado, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerRetencionDeDigitos(idEvaluado: String, numeroRetencionDigitos: number){
    return this._http.get(this.url + '/analisis-proceso/retencion-digitos?idEvaluado='+idEvaluado+
    '&numeroRetencionDigitos='+numeroRetencionDigitos, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }
}
