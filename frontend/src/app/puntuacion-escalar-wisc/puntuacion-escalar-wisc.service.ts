import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PuntuacionEscalarWiscService {

  private url = "http://localhost:8080";
  constructor( private _http: Http, private http: HttpClient ) { }

  public obtenerPuntuacionEscalarDisenoCubos(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/diseno-cubos?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarSemejanzas(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/semejanzas?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarRetencionDeDigitos(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/retencion-digitos?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarConceptosConDibujos(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/conceptos-con-dibujos?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarClaves(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/claves?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarVocabulario(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/vocabulario?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarNumerosLetras(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/numeros-letras?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarMatrices(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/matrices?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarComprension(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/comprension?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarBusquedaSimbolos(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/busqueda-simbolos?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarFigurasIncompletas(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/figuras-incompletas?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarRegistros(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/registros?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarInformacion(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/informacion?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarAritmetica(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/aritmetica?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }

  public obtenerPuntuacionEscalarPistas(edad: number, puntuacionNatural: number, meses: number): Observable<number>{
    return this.http.get<number>(this.url + '/puntuacion-escalar-wisc/pistas?puntuacionNatural='+puntuacionNatural+'&edad='+edad+'&meses='+meses, httpOptions);
  }
}
