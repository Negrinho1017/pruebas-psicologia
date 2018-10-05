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
  anteriorReactivo = 5;
  siguienteReactivo = 5;  
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  listaCalificaciones: number[] = [0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  habilitaReactivo: boolean[] = [true, true, true, true, true, false, false, false, false,
    false, false, false, false, false, false];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  puntuacionEscalar: any;
  posicionCubos: number[][] = [
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
  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { this.navIsFixed = false; }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
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
    if (this.posicionCubos[i][posicion] == 5) {
      this.posicionCubos[i][posicion] = 0;
    }
    else {
      this.posicionCubos[i][posicion] = this.posicionCubos[i][posicion] + 1;
    }
  }   

  habilitarReactivo(i): boolean {    
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return this.habilitaReactivo[i];
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number) {
    this.reactivoActual = new Reactivo();
    this.reactivoActual.respuesta = this.convertirVectorAString(numeroReactivo);
    this.reactivoActual.puntuacion = puntuacionReactivo;
    this.reactivosCalificados[numeroReactivo] = (this.reactivoActual);
    this.listaCalificaciones[numeroReactivo] = puntuacionReactivo;
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if (numeroReactivo == 6 && (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo - 1] < 2)) {
      this.habilitaReactivo[numeroReactivo - 2] = false;
      this.habilitaReactivo[numeroReactivo - 3] = false;
      this.listaCalificaciones[numeroReactivo - 2] = 0;
      this.listaCalificaciones[numeroReactivo - 3] = 0;
      this.cambiarFoco(numeroReactivo, 4);
    }
    else if (numeroReactivo == 3 || numeroReactivo == 2) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else {
      if (numeroReactivo == 4) {
        this.cambiarFoco(numeroReactivo, numeroReactivo - 1);       
      }
      else if (numeroReactivo == 1) {
        if((puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo + 1] < 2)){
          this.anteriorReactivo = numeroReactivo;
          this.mensajeError("Se ha descontinuado la subprueba");
        }
        else{          
          this.cambiarFoco(numeroReactivo, 7);
        }
      }
      else {        
        if(!this.discontinuar(puntuacionReactivo, numeroReactivo)){
          this.cambiarFoco(numeroReactivo, numeroReactivo + 1);
        }
      }
    }
  }

  private reversarInversion(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo + 1] < 2) {
      this.habilitaReactivo[numeroReactivo - 1] = false;
      this.listaCalificaciones[numeroReactivo - 1] = 0;
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else {
      this.cambiarFoco(numeroReactivo, 7);
    }
  }

  cambiarFoco(numeroReactivo: number, siguienteR: number){
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    let discontinua: boolean = puntuacionReactivo == 0 
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && numeroReactivo > 7;
    if(discontinua){
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeError("Se ha descontinuado la subprueba");
    }
    return discontinua;
  }

  calificarSubprueba() {
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.puntuacion = this.puntuacion + calificacionReactivo;
    }
    this.subprueba.puntuacionNatural = this.puntuacion;    
    this.puntuacion = 0;
  } 

  finalizarSubprueba() {
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarDisenoCubos("20:0-24:11", this.subprueba.puntuacionNatural)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.router.navigate(['/semejanzas']);
        this.scrollToTop();
      });
  }

  getReactivoSiguiente(): number {
    return this.siguienteReactivo;
  }

  scrollPorId(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  mensajeError(mensaje: string) {
    swal({
      title: 'Discontinación',
      icon: "warning",
      text: mensaje,
    });
  }

  convertirVectorAString(numReactivo: number): String {
    let respuesta: String = "";
    for (let posicionCubo of this.posicionCubos[numReactivo]) {
      respuesta = respuesta.concat(posicionCubo.toString());      
    }
    return respuesta;
  }
}