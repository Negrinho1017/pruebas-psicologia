import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Prueba } from '../../model/Prueba';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subprueba } from '../../model/Subprueba';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
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

  public obtenerPruebaPorIdDelEvaluado(idEvaluado: string): Observable<any>{
    const httpOptions ={
      params: new HttpParams().set('idEvaluado', idEvaluado)
    };
    return this.http.get(this.url + '/prueba-por-id', httpOptions);
  };
  
  crearPrueba(prueba: Prueba) {
    return this.http.post(this.url + '/creacion-prueba', prueba, httpOptions)
  }

  crearSubprueba(subprueba: Subprueba, idEvaluado: String) {
    return this.http.put(this.url + '/creacion-subprueba/'+idEvaluado, subprueba, httpOptions).subscribe(result => {
        console.log(result);
      }, error => console.log('Error enviando la solicitud'));
  }

  ingresarPuntuacionCompuesta(idEvaluado: String) {
    return this.http.put(this.url + '/puntuacion-compuesta/ingreso-puntuacion-compuesta/'+idEvaluado, httpOptions).subscribe(result => {
        console.log(result);
      }, error => console.log('Error enviando la solicitud'));
  }  
}
