import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../model/Reactivo';
import { Subprueba } from '../model/Subprueba';
import { Globals } from '../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diseno-cubos',
  templateUrl: './diseno-cubos.component.html',
  styleUrls: ['./diseno-cubos.component.css']
})
export class DisenoCubosComponent implements OnInit {
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  listaCalificaciones: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  contador: number[][] = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 7, 0, 0],
    [0, 0, 7, 0, 0],
    [0, 0, 7, 0, 0],
    [0, 0, 7, 0, 0],
    [0, 0, 7, 0, 0],
    [0, 0, 7, 0, 0],
    [0, 0, 7, 0, 0],
    [0, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  imagenesCubos: any[] = ["CubosReactivo0.png", "CubosReactivo1.png", "CubosReactivo2.png", "CubosReactivo3.png", "CubosReactivo4.png", "CubosReactivo5.png", "CubosReactivo6.png", "CubosReactivo7.png", "CubosReactivo8.png", "CubosReactivo9.png", "CubosReactivo10.png",
    "CubosReactivo11.png", "CubosReactivo12.png", "CubosReactivo13.png", "CubosReactivo14.png"];
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router ) { }

  ngOnInit() {
    this.subprueba.nombre = "Diseño de cubos";
    this.subprueba.numeroSubprueba = 1;
  }

  cambiarImg(i, posicion): void {
    if (this.contador[i][posicion] == 5) {
      this.contador[i][posicion] = 0;
    }
    else {
      this.contador[i][posicion] = this.contador[i][posicion] + 1;
    }
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
    this.router.navigate(['/semejanzas']);
  }

}
