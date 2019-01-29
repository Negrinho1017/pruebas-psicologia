import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../../model/Reactivo';
import { Subprueba } from '../../model/Subprueba';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-matrices-wisc',
  templateUrl: './matrices-wisc.component.html',
  styleUrls: ['./matrices-wisc.component.css']
})
export class MatricesWiscComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  primerReactivo: number = 3;
  reactivoDeInicio: number;
  siguienteReactivo: number;
  anteriorReactivo: number;
  respuestasCorrectas: number[] = [1, 5, 4, 5, 1, 2, 2, 3, 4, 4, 1, 4, 3, 2, 5, 1, 4, 2, 1, 4, 5, 4, 3, 2, 3, 3, 4, 2, 1, 1, 3, 2, 2, 5, 4, 3, 1, 5];
  puntuacion: number = 0;
  listaCalificaciones: number[];
  habilitaReactivo: boolean[] = [];
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService) { }

  ngOnInit() {
    this.criteriosDeInversion();
    this.siguienteReactivo = this.reactivoDeInicio;
    this.anteriorReactivo = this.reactivoDeInicio;
    this.subprueba.numeroSubprueba = 8;
    this.subprueba.nombre = "Matrices";
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 8) {
      this.reactivoDeInicio = 6;
      this.habilitaReactivo = [true, true, true, true, true, true];
      this.listaCalificaciones = [0, 0, 0, 1, 1, 1];
    }
    else if (this.globals.edad >= 9 && this.globals.edad <= 11) {
      this.reactivoDeInicio = 9;
      this.habilitaReactivo = [true, true, true, true, true, true, true, true, true];
      this.listaCalificaciones = [0, 0, 0, 1, 1, 1, 1, 1, 1];
    }
    else {
      this.reactivoDeInicio = 13;
      this.habilitaReactivo = [true, true, true, true, true, true, true, true, true, true, true, true, true];
      this.listaCalificaciones = [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    }
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number) {
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo);
    this.calificarSubprueba();
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if (this.reactivoDeInicio != this.primerReactivo &&
      numeroReactivo == this.reactivoDeInicio + 1 && (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo - 1] == 0)) {
      this.limpiarReactivosAnt(numeroReactivo);
    }
    else if (numeroReactivo <= this.reactivoDeInicio - 2 && numeroReactivo > this.primerReactivo) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio - 1) {
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else if (numeroReactivo == this.primerReactivo && this.reactivoDeInicio != this.primerReactivo) {
      this.determinarContinua(puntuacionReactivo, numeroReactivo);
    }
    else if (!this.discontinuar(puntuacionReactivo, numeroReactivo)) {
      this.cambiarFoco(numeroReactivo, numeroReactivo + 1);
    }
  }

  private reversarInversion(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo + 1] == 0) {
      this.habilitaReactivo[numeroReactivo - 1] = false;
      this.listaCalificaciones[numeroReactivo - 1] = 0;
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio + 2);
    }
  }

  private determinarContinua(puntuacionReactivo: number, numeroReactivo: number) {
    if ((puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo + 1] == 0)) {
      this.anteriorReactivo = numeroReactivo;
      this.mensajeWarning("Se ha descontinuado la subprueba");
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio + 2);
    }
  }

  private limpiarReactivosAnt(numeroReactivo: number) {
    this.habilitaReactivo[numeroReactivo - 2] = false;
    this.habilitaReactivo[numeroReactivo - 3] = false;
    this.listaCalificaciones[numeroReactivo - 2] = 0;
    this.listaCalificaciones[numeroReactivo - 3] = 0;
    this.cambiarFoco(numeroReactivo, this.reactivoDeInicio - 1);
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    const cantidadParaDescontinuar: number = 4;
    let reactivoActual = puntuacionReactivo == 0 ? 1 : 0;
    let reactivoAnterior = this.listaCalificaciones[numeroReactivo - 1] == 0 ? 1 : 0;
    let reactivoAnterior2 = this.listaCalificaciones[numeroReactivo - 2] == 0 ? 1 : 0;
    let reactivoAnterior3 = this.listaCalificaciones[numeroReactivo - 3] == 0 ? 1 : 0;
    let reactivoAnterior4 = this.listaCalificaciones[numeroReactivo - 4] == 0 ? 1 : 0;
    var contadorDePuntuacionesFallidas = reactivoActual + reactivoAnterior + reactivoAnterior2 + reactivoAnterior3 + reactivoAnterior4;
    let discontinua: boolean = (puntuacionReactivo == 0
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0
      && this.listaCalificaciones[numeroReactivo - 3] == 0
      && this.listaCalificaciones[numeroReactivo - 4] == 0
      && numeroReactivo > this.reactivoDeInicio + cantidadParaDescontinuar)
      || (contadorDePuntuacionesFallidas == 4 && numeroReactivo > this.reactivoDeInicio + 5);
    if (discontinua) {
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeWarning("Se ha descontinuado la subprueba");
    }
    return discontinua;
  }

  cambiarFoco(numeroReactivo: number, siguienteR: number) {
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
  }

  habilitarReactivo(i): boolean {
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return this.habilitaReactivo[i];
  }

  calificarSubprueba() {
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.puntuacion = this.puntuacion + calificacionReactivo;
    }
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.crearReactivos();
    this.puntuacion = 0;
  }
  crearReactivos() {
    var i = 0;
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.reactivoActual = new Reactivo();
      this.reactivoActual.puntuacion = calificacionReactivo;
      this.reactivosCalificados[i] = (this.reactivoActual);
      i++;
    }
  }

  finalizarSubprueba() {
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarMatrices(this.globals.edad, this.subprueba.puntuacionNatural, this.globals.meses)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.router.navigate([this.globals.rutas[8]]);
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
  
  getReactivoSiguiente(): number {
    return this.siguienteReactivo;
  }

  scrollPorId(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  mensajeWarning(mensaje: string) {
    swal({
      title: 'Prueba finalizada',
      icon: "warning",
      text: mensaje,
    });
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  cambiarPorFigurasIncompletas() {
    if (this.globals.subpruebas[0] == "Figuras incompletas" || this.globals.subpruebas[3] == "Figuras incompletas") {
      this.mensajeError("La subprueba figuras incompletas ya fue realizada")
    } else {
      this.globals.rutas[7] = "/figuras-incompletas-wisc";
      this.globals.subpruebas[7] = "Figuras incompletas";
      this.router.navigate([this.globals.rutas[7]]);
    }
  }

  mensajeError(mensaje: string) {
    swal({
      title: 'Error!',
      icon: "error",
      text: mensaje,
    });
  }
}
