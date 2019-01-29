import { Component, OnInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import { Reactivo } from 'src/app/model/Reactivo';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { CronometroComponent } from 'src/app/cronometro/cronometro.component';
import { Subprueba } from 'src/app/model/Subprueba';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-diseno-cubos-wisc',
  templateUrl: './diseno-cubos-wisc.component.html',
  styleUrls: ['./diseno-cubos-wisc.component.css']
})
export class DisenoCubosWiscComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  navIsFixed: boolean;
  primerReactivo: number = 0;
  reactivoDeInicio: number;
  anteriorReactivo: number;
  siguienteReactivo: number
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  listaCalificaciones: number[];
  habilitaReactivo: boolean[];
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
  imagenesCubos: any[] = ["Cubos_1.png","Cubos_2.png","Cubos_3.png","Cubos_4.png","Cubos_5.png","Cubos_6.png",
  "Cubos_7.png","Cubos_8.png","Cubos_9.png","Cubos_10.png","Cubos_11.png","Cubos_12.png","Cubos_13.png",
  "Cubos_14.png"];
  
  @ViewChildren(CronometroComponent) cronometros !: QueryList<CronometroComponent>;

  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarWiscService: PuntuacionEscalarWiscService) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { this.navIsFixed = false; }
  }

  ngOnInit() {
    this.criteriosDeInversion();
    this.anteriorReactivo = this.reactivoDeInicio;
    this.siguienteReactivo = this.reactivoDeInicio;
    this.subprueba.nombre = "Diseño de cubos";
    this.subprueba.numeroSubprueba = 1;
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 7) {
      this.reactivoDeInicio = 0;
      this.habilitaReactivo = [];
      this.listaCalificaciones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else{
      this.reactivoDeInicio = 2;
      this.habilitaReactivo = [true,true];
      this.listaCalificaciones = [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }

  finalizarSubprueba() {
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarWiscService.obtenerPuntuacionEscalarDisenoCubos(this.globals.edad, this.subprueba.puntuacionNatural, this.globals.meses)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.router.navigate([this.globals.rutas[1]]);
        this.scrollToTop();
      }, error => {
        this.mensajeExcepcion("Ha ocurrido un error, es posible que no haya calificado ningún reactivo");
      });
  }

  mensajeExcepcion(mensaje: string) {
    swal({
      title: 'Error',
      icon: "error",
      text: mensaje,
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
    if (this.reactivoDeInicio != this.primerReactivo &&
      numeroReactivo == this.reactivoDeInicio+1 && (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo - 1] < 2)) {
      this.limpiarReactivosAnt(numeroReactivo);
    }
    else if (numeroReactivo <= this.reactivoDeInicio-2 && numeroReactivo >= this.primerReactivo+1) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio-1) {
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else if (numeroReactivo == this.primerReactivo && this.reactivoDeInicio != this.primerReactivo) {
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
      this.mensajeError("Se ha terminado la subprueba");
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio+2);
    }
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    const cantidadParaDescontinuar: number = 3;
    let discontinua: boolean = puntuacionReactivo == 0
    && this.listaCalificaciones[numeroReactivo - 2] == 0
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && numeroReactivo > this.reactivoDeInicio+cantidadParaDescontinuar;
    if (discontinua) {
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeError("Se ha terminado la subprueba");
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
      title: 'Prueba finalizada',
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

  cambiarPorFigurasIncompletas(){
    this.globals.rutas[0]="/figuras-incompletas-wisc";
    this.globals.subpruebas[0] = "Figuras incompletas";
    this.router.navigate([this.globals.rutas[0]]);
  }

}
