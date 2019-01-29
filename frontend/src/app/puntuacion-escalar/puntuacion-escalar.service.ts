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

  public obtenerPuntuacionEscalarDisenoCubos(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/diseno-cubos?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarSemejanzas(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/semejanzas?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarRetencionDigitos(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/retencion-digitos?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarMatrices(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/matrices?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarVocabulario(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/vocabulario?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarAritmetica(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/aritmetica?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarBusquedaSimbolos(edad: number, puntuacionNatural: number): Observable<any>{
    return this.http.get(this.url + '/puntuacion-escalar/busqueda-simbolos?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }


  public obtenerPuntuacionEscalarRompecabezasVisual(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/rompecabezas-visual?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarInformacion(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/informacion?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarClaves(edad: number, puntuacionNatural: number): Observable<any>{
    return this.http.get(this.url + '/puntuacion-escalar/claves?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
  }

  public obtenerPuntuacionEscalarNumerosLetras(edad: number, puntuacionNatural: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar/numeros-letras?puntuacionNatural='+puntuacionNatural+'&edad='+edad, httpOptions);
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
