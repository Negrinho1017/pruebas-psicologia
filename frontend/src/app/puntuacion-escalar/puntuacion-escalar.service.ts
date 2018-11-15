import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subprueba } from '../model/Subprueba';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PuntuacionEscalarService {

  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http, private http: HttpClient ) { }

  obtenerPuntuacionEscalarDisenoCubos(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/diseno-cubos?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarSemejanzas(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/semejanzas?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarRetencionDigitos(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/retencion-digitos?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarMatrices(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/matrices?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarVocabulario(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/vocabulario?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarAritmetica(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/aritmetica?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  public obtenerPuntuacionEscalarBusquedaSimbolos(idEdad: string, puntuacionNatural: number): Observable<any>{
    const httpOptions = {
      params: new HttpParams().set('idEdad', idEdad)
    };
    return this.http.get(this.url + '/puntuacion-escalar/busqueda-simbolos?puntuacionNatural='+puntuacionNatural, httpOptions);
  }

  obtenerPuntuacionEscalarRompecabezasVisual(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/rompecabezas-visual?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarInformacion(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/informacion?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  /*obtenerPuntuacionEscalarClaves(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/claves?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }*/

  public obtenerPuntuacionEscalarClaves(idEdad: string, puntuacionNatural: number): Observable<any>{
    const httpOptions = {
      params: new HttpParams().set('idEdad', idEdad)
    };
    return this.http.get(this.url + '/puntuacion-escalar/claves?puntuacionNatural='+puntuacionNatural, httpOptions);
  }

  obtenerPuntuacionEscalarNumerosLetras(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/numeros-letras?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }
}
