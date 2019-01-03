import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Prueba } from '../../model/Prueba';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subprueba } from '../../model/Subprueba';
import { Observable } from 'rxjs';
import { SubpruebasAnalisisProceso } from 'src/app/model/SubpruebasAnalisisProceso';

@Injectable({
  providedIn: 'root'
})
export class AnalisisProcesoService {
  private url = "http://localhost:8080";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor( private _http: Http, private http: HttpClient ) { }

  public obtenerSubpruebasAnalisisProceso(idEvaluado: String): Observable<SubpruebasAnalisisProceso>{
    const httpOptions = {
      params: new HttpParams().set('idEvaluado', <string> idEvaluado)
    };
    return this.http.get<SubpruebasAnalisisProceso>(this.url + '/analisis-proceso/subpruebas-analisis-proceso', httpOptions);
  }
}
