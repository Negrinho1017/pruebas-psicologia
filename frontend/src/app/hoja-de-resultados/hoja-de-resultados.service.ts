import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/';
import { EdadPersona } from '../model/EdadPersona';
import { Prueba } from '../model/Prueba';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  

  crearPrueba(prueba: Prueba) {
    return this.http.post(this.url + '/creacion-prueba', prueba, httpOptions).subscribe(result => {
        console.log(result);
      }, error => console.log('There was an error: '));
  }
    /*return this._http.post(this.url + '/creacion-prueba', prueba, this.options);  
  }*/
  /*public crearPrueba(prueba: Prueba): Observable<Prueba> {
    return this.http.post<Prueba>(this.url + '/creacion-prueba', prueba);
  }*/
}
