import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subprueba } from 'src/app/model/Subprueba';

@Injectable({
  providedIn: 'root'
})
export class FortalezasDebilidadesService {
  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http, private http: HttpClient ) { }

  obtenerSubpruebasPorIdEvaluado(idEvaluado: String): Observable<Subprueba[]> {
    return this.http.get<Subprueba[]>(this.url + '/subpruebas?idEvaluado='+idEvaluado);
  }
}
