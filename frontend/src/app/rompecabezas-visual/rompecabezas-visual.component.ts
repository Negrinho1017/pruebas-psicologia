import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../model/Reactivo';
import { Subprueba } from '../model/Subprueba';
import { Globals } from '../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rompecabezas-visual',
  templateUrl: './rompecabezas-visual.component.html',
  styleUrls: ['./rompecabezas-visual.component.css']
})
export class RompecabezasVisualComponent implements OnInit {
  respuestasCorrectas: String[] = ["2, 3, 5","1, 2, 5","1, 4, 6","2, 3, 6","3, 5, 6","1, 3, 6","2, 5, 6","1, 3, 4",
"1, 3, 6","1, 2, 5", "1, 2, 5", "1, 4, 5","3, 4, 6","2, 3, 4","1, 2, 6","3, 4, 6","1, 2, 6", "2, 3, 5",
"1, 5, 6","2, 3, 5","1 ,3 ,4","1, 5, 6","3, 4, 6","3, 4, 5","1, 2, 3","3, 4, 6"];
puntuacion: number = 0;
listaCalificaciones: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
reactivosCalificados: Reactivo[] = [];
subprueba: Subprueba = new Subprueba();
reactivoActual: Reactivo;
hayDiscontinuacion: boolean = false;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router ) { }

  ngOnInit() {
    this.subprueba.nombre = "Rompecabezas visual";
    this.subprueba.numeroSubprueba = 8;
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number){
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo); 
    this.calificarSubprueba();
  }

  calificarSubprueba(){
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.puntuacion = this.puntuacion + calificacionReactivo;
    } 
    this.subprueba.puntuacionNatural=this.puntuacion;
    this.crearReactivos();
    this.puntuacion = 0; 
}
  crearReactivos(){
    var i = 0;
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.reactivoActual = new Reactivo();
      this.reactivoActual.puntuacion=calificacionReactivo;
      this.reactivosCalificados[i] = (this.reactivoActual);
      i++;
    }
  }

  finalizarSubprueba(){
    this.subprueba.reactivos = this.reactivosCalificados;
    this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
    this.router.navigate(['/informacion']);
  }

}
