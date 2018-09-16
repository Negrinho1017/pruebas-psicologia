import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/';
import { EdadPersona } from '../model/EdadPersona';
import { Prueba } from '../model/Prueba';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subprueba } from '../model/Subprueba';
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

  obtenerPruebaPorIdDelEvaluado(idEvaluado: String){
    return this._http.get(this.url + '/prueba-por-id?idEvaluado='+idEvaluado, this.options).
    pipe(map((response:Response)=>response.json()),
    catchError( error => {
      return ("Error!!")
    }));  
  }
  
  crearPrueba(prueba: Prueba) {
    return this.http.post(this.url + '/creacion-prueba', prueba, httpOptions).subscribe(result => {
        console.log(result);
      }, error => console.log('There was an error: '));
  }

  crearSubprueba(subprueba: Subprueba, idEvaluado: String) {
    return this.http.put(this.url + '/creacion-subprueba/'+idEvaluado, subprueba, httpOptions).subscribe(result => {
        console.log(result);
      }, error => console.log('Error enviando la solicitud'));
  }
}
