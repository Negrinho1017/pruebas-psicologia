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

  obtenerPuntuacionEscalarDisenoCubos(edad: number, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/diseno-cubos?edad='
    +edad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarSemejanzas(edad: number, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/semejanzas?edad='
    +edad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarRetencionDigitos(edad: number, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/retencion-digitos?edad='
    +edad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarMatrices(edad: number, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/matrices?edad='
    +edad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarVocabulario(edad: number, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/vocabulario?edad='
    +edad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarAritmetica(edad: number, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/aritmetica?edad='
    +edad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  public obtenerPuntuacionEscalarBusquedaSimbolos(edad: number, puntuacionNatural: number): Observable<any>{
    return this.http.get(this.url + '/puntuacion-escalar/busqueda-simbolos?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  obtenerPuntuacionEscalarRompecabezasVisual(edad: number, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/rompecabezas-visual?edad='
    +edad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  obtenerPuntuacionEscalarInformacion(edad: number, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/informacion?edad='
    +edad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  public obtenerPuntuacionEscalarClaves(edad: number, puntuacionNatural: number): Observable<any>{
    return this.http.get(this.url + '/puntuacion-escalar/claves?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  obtenerPuntuacionEscalarNumerosLetras(edad: number, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/numeros-letras?edad='
    +edad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }

  public obtenerPuntuacionEscalarPesoFigurado(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/peso-figurado?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarComprension(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/comprension?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarCancelacion(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/cancelacion?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarFigurasIncompletas(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/figuras-incompletas?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }
}
