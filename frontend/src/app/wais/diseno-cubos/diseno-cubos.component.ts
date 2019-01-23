import { Component, OnInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import { Reactivo } from '../../model/Reactivo';
import { Subprueba } from '../../model/Subprueba';
import { Globals } from '../../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';
import { CronometroComponent } from 'src/app/cronometro/cronometro.component';

@Component({
  selector: 'app-diseno-cubos',
  templateUrl: './diseno-cubos.component.html',
  styleUrls: ['./diseno-cubos.component.css']
})

export class DisenoCubosComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  navIsFixed: boolean;
  primerReactivo: number = 1;
  reactivoDeInicio: number = 5;
  anteriorReactivo = this.reactivoDeInicio;
  siguienteReactivo = this.reactivoDeInicio;
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  listaCalificaciones: number[] = [0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  habilitaReactivo: boolean[] = [true, true, true, true, true, false, false, false, false];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  puntuacionEscalar: any;
  puntuacionSinBonificacionDeTiempo: number = 0;
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
  imagenesCubos: any[] = ["CubosReactivo0.png", "CubosReactivo1.png", "CubosReactivo2.png", "CubosReactivo3.png", "CubosReactivo4.png", "CubosReactivo5.png", "CubosReactivo6.png", "CubosReactivo7.png", "CubosReactivo8.png", "CubosReactivo9.png", "CubosReactivo10.png", "CubosReactivo11.png", "CubosReactivo12.png", "CubosReactivo13.png", "CubosReactivo14.png"];
  edadMaximaSubPruebas = Number(localStorage.getItem('anios'));
  
  @ViewChildren(CronometroComponent) cronometros !: QueryList<CronometroComponent>;

  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { this.navIsFixed = false; }
  }

  ngOnInit() {
    this.globals.idEvaluado = localStorage.getItem('idEvaluado').toString();
    this.subprueba.nombre = "Diseño de cubos";
    this.subprueba.numeroSubprueba = 1;
  }

  finalizarSubprueba() {
    this.globals.edad = Number(localStorage.getItem('anios'));
    this.globals.meses = Number(localStorage.getItem('meses'));
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarDisenoCubos(this.globals.edad, this.subprueba.puntuacionNatural)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.globals.rutas[1] = '/semejanzas';
        this.router.navigate([this.globals.rutas[1]]);
        this.scrollToTop();
      });
  }

  calificarSubprueba() {
    this.puntuacionSinBonificacionDeTiempo = 0;
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.puntuacion = this.puntuacion + calificacionReactivo;
      const califiacionSinTiempo: number = calificacionReactivo <= 4 ? calificacionReactivo : 4;
      this.puntuacionSinBonificacionDeTiempo = this.puntuacionSinBonificacionDeTiempo + califiacionSinTiempo;
    }
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacion = 0;
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number) {
    this.reactivoActual = new Reactivo();    
    console.log("Tiempo: "+this.cronometros.toArray()[numeroReactivo].obtenerTiempo());
    this.reactivoActual.respuesta = this.convertirVectorAString(numeroReactivo);
    this.reactivoActual.puntuacion = puntuacionReactivo;
    this.reactivosCalificados[numeroReactivo] = (this.reactivoActual);
    this.listaCalificaciones[numeroReactivo] = puntuacionReactivo;
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if (numeroReactivo == this.reactivoDeInicio+1 && (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo - 1] < 2)) {
      this.limpiarReactivosAnt(numeroReactivo);
    }
    else if (numeroReactivo <= this.reactivoDeInicio-2 && numeroReactivo >= this.primerReactivo+1) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio-1) {
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else if (numeroReactivo == this.primerReactivo) {
      this.determinarContinua(puntuacionReactivo, numeroReactivo);
    }
    else if (!this.discontinuar(puntuacionReactivo, numeroReactivo)) {
      this.cambiarFoco(numeroReactivo, numeroReactivo + 1);
    }
  }

  private limpiarReactivosAnt(numeroReactivo: number) {
    this.habilitaReactivo[numeroReactivo - 2] = false;
    this.habilitaReactivo[numeroReactivo - 3] = false;
    this.listaCalificaciones[numeroReactivo - 2] = 0;
    this.listaCalificaciones[numeroReactivo - 3] = 0;
    this.cambiarFoco(numeroReactivo, this.reactivoDeInicio-1);
  }

  private reversarInversion(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo + 1] < 2) {
      this.habilitaReactivo[numeroReactivo - 1] = false;
      this.listaCalificaciones[numeroReactivo - 1] = 0;
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio+2);
    }
  }

  private determinarContinua(puntuacionReactivo: number, numeroReactivo: number) {
    if ((puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo + 1] < 2)) {
      this.anteriorReactivo = numeroReactivo;
      this.mensajeError("Se ha descontinuado la subprueba");
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio+2);
    }
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    const cantidadParaDescontinuar: number = 2;
    let discontinua: boolean = puntuacionReactivo == 0
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && numeroReactivo > this.reactivoDeInicio+cantidadParaDescontinuar;
    if (discontinua) {
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeError("Se ha descontinuado la subprueba");
    }
    return discontinua;
  }

  cambiarFoco(numeroReactivo: number, siguienteR: number) {
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
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
    return i < 6 ? this.habilitaReactivo[i] : false;
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

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  cambiarSubprueba(numeroSubprueba: number){
    if(numeroSubprueba==1){
      this.cambiarPorPesoFigurado();
    }
    if(numeroSubprueba==2){
      this.cambiarPorFigurasIncompletas();
    }   
  }

  cambiarPorPesoFigurado(){
    localStorage.setItem('siguientePrueba', 'se');
    this.globals.rutas[0]="/peso-figurado";
    this.globals.subpruebas[0] = "Peso figurado";
    this.router.navigate([this.globals.rutas[0]]);
  }

  cambiarPorFigurasIncompletas(){
    localStorage.setItem('siguientePrueba', 'se');
    this.globals.rutas[0]="/figuras-incompletas";
    this.globals.subpruebas[0] = "Figuras incompletas";
    this.router.navigate([this.globals.rutas[0]]);
  }

}