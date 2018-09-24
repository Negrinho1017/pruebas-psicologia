import { Component, OnInit, HostListener } from '@angular/core';
import { Reactivo } from '../../model/Reactivo';
import { Subprueba } from '../../model/Subprueba';
import { Globals } from '../../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-diseno-cubos',
  templateUrl: './diseno-cubos.component.html',
  styleUrls: ['./diseno-cubos.component.css']
})
export class DisenoCubosComponent implements OnInit {   
  navIsFixed: boolean;  
  siguienteReactivo = 5;  
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  listaCalificaciones: number[] = [0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0];
  habilitaReactivo: boolean[] = [true, true, true, true, true, false, false, false, false, 
  false, false, false, false, false, false];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  puntuacionEscalar: any;
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
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.navIsFixed = true;
        } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { this.navIsFixed = false; } } 
        scrollToTop() { (function smoothscroll() { var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    }

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

  habilitarReactivo(i): boolean {
    return this.habilitaReactivo[i];
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number){
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo);
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }  

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if(numeroReactivo == 6 && (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo-1] == 0)){
      this.habilitaReactivo[numeroReactivo -2] = false;
      this.habilitaReactivo[numeroReactivo - 3] = false;
      this.listaCalificaciones[numeroReactivo - 2] = 0;
      this.listaCalificaciones[numeroReactivo - 3] = 0;
      this.siguienteReactivo = 4;
      this.scrollPorId("checksreactivo4"); 
    }
    else if((numeroReactivo == 3 || numeroReactivo == 2)) {
      if(puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo+1] == 0){
        this.habilitaReactivo[numeroReactivo -1] = false;            
        this.listaCalificaciones[numeroReactivo - 1] = 0;            
        this.siguienteReactivo = numeroReactivo -1;
        this.scrollPorId("checksreactivo"+this.siguienteReactivo); 
      }
      else {
        this.siguienteReactivo = 7;
        this.scrollPorId("checksreactivo7"); 
      }  
    }
    else{
      if(numeroReactivo == 4){
        this.siguienteReactivo = 3;
        this.scrollPorId("checksreactivo3"); 
      }
      else if(numeroReactivo == 1){
        this.siguienteReactivo = 7; 
        this.scrollPorId("checksreactivo7");        
      }
      else{
        this.siguienteReactivo = numeroReactivo+1;
        this.scrollPorId("checksreactivo"+this.siguienteReactivo);
      }
    }      
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
    this.puntuacionEscalarService.obtenerPuntuacionEscalarDisenoCubos("20:0-24:11",this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.router.navigate(['/semejanzas']);
    });    
  }
  
  getReactivoSiguiente(): number {
    return this.siguienteReactivo;   
  }  
    
  scrollPorId(id) {    
    let el = document.getElementById(id);  
    el.scrollIntoView({block: "center", behavior: "smooth"});    
  }
}