import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HojaDePuntuacionesCompuestasService {

  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http ) { }

  obtenerPuntuacionCompuesta(idIndice: String, puntuacionTotal: number) {
    return this._http.get(this.url + '/puntuacion-compuesta/componentes-puntuacion?idIndice='
    +idIndice+'&puntuacionTotal='+puntuacionTotal, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPercentil(idIndice: String, puntuacionTotal: number) {
    return this._http.get(this.url + '/puntuacion-compuesta/rango-percentil?idIndice='
    +idIndice+'&puntuacionTotal='+puntuacionTotal, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerIntervaloConfianza(idIndice: String, puntuacionTotal: number) {
    return this._http.get(this.url + '/puntuacion-compuesta/intervalo-confianza?idIndice='
    +idIndice+'&puntuacionTotal='+puntuacionTotal, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }
}
