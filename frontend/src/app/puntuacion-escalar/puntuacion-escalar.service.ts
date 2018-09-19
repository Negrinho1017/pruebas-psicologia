import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
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
  constructor( private _http: Http ) { }

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

  obtenerPuntuacionEscalarBusquedaSimbolos(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/busqueda-simbolos?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
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

  obtenerPuntuacionEscalarClaves(idEdad: String, puntuacionNatural: number) {
    return this._http.get(this.url + '/puntuacion-escalar/claves?idEdad='
    +idEdad+'&puntuacionNatural='+puntuacionNatural, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }
}
