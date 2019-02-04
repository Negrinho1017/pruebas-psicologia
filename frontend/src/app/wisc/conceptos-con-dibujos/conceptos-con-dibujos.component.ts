import { Component, OnInit } from '@angular/core';
import { Reactivo } from 'src/app/model/Reactivo';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { Subprueba } from 'src/app/model/Subprueba';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-conceptos-con-dibujos',
  templateUrl: './conceptos-con-dibujos.component.html',
  styleUrls: ['./conceptos-con-dibujos.component.css']
})
export class ConceptosConDibujosComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  primerReactivo: number = 2;
  reactivoDeInicio: number;
  siguienteReactivo: number;
  anteriorReactivo: number;
  respuestasCorrectas: String[] = ["2, 3","1, 3","1, 4","1 ,4","2, 4","1, 3","3, 5","1, 6","2, 6","2, 3",
  "3, 5","2, 4","1, 5","3, 4","1, 6, 9","3, 5, 7","2, 6, 8","3, 5, 8","2, 6, 7","3, 6, 11","2, 4, 9",
  "1, 8, 10","3, 4, 7","2, 7, 9","3, 5, 12","2, 8, 10","1, 7, 12","1, 6, 7","4, 5, 9","2, 8, 10"];
  puntuacion: number = 0;
  listaCalificaciones: number[];
  habilitaReactivo: boolean[];
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  reactivosFinalizadosPuntuacion: number[] = [];
  reactivosFinalizadosRespuesta: String[] = [];
  puntuacionNaturalFinal: number;
  pruebaConsultada: boolean;
  primerosReactivos: number[];

  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService) { }

  ngOnInit() {
    this.criteriosDeInversion();
    this.siguienteReactivo = this.reactivoDeInicio;
    this.anteriorReactivo = this.reactivoDeInicio;
    this.subprueba.numeroSubprueba = 4;
    this.subprueba.nombre = "Conceptos con dibujos";
    if(this.globals.pruebaTerminada){
      this.pruebaConsultada = true;
      this.consultarResultados();
      this.siguienteReactivo = -1;
    }
  }

  consultarResultados(){
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(<string> this.globals.idEvaluado).subscribe(
      res => {
        var i = 0;
        this.puntuacionNaturalFinal = res.ramaDelConocimiento[1].subpruebas[1].puntuacionNatural;
        for (let reactivo of res.ramaDelConocimiento[1].subpruebas[1].reactivos) {
          if(reactivo != null){
            this.reactivosFinalizadosPuntuacion[i] = reactivo.puntuacion;
            this.reactivosFinalizadosRespuesta[i] = reactivo.respuesta;
          }else{
            this.reactivosFinalizadosPuntuacion[i] = this.primerosReactivos[i] != null ? this.primerosReactivos[i] : 0;
            this.reactivosFinalizadosRespuesta[i] = "";
          }
          i++;
        }
      })
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 8) {
      this.reactivoDeInicio = 2;
      this.habilitaReactivo = [];
      this.listaCalificaciones = [0, 0];
      this.primerosReactivos = [];
    }
    else if (this.globals.edad >= 9 && this.globals.edad <= 11) {
      this.reactivoDeInicio = 5;
      this.habilitaReactivo = [true,true,true,true,true];
      this.listaCalificaciones = [0, 0, 1, 1, 1];
      this.primerosReactivos = [0, 0, 1, 1, 1];
    }
    else {
      this.reactivoDeInicio = 7;
      this.habilitaReactivo = [true,true,true,true,true,true,true];
      this.listaCalificaciones = [0, 0, 1, 1, 1, 1, 1];
      this.primerosReactivos = [0, 0, 1, 1, 1, 1, 1];
    }
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number) {
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo);
    this.calificarSubprueba();
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if(this.reactivoDeInicio != this.primerReactivo &&
      numeroReactivo == this.reactivoDeInicio + 1 && (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo - 1] == 0)) {
      this.limpiarReactivosAnt(numeroReactivo);
    }
    else if (numeroReactivo <= this.reactivoDeInicio-2 && numeroReactivo > this.primerReactivo) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio-1) {
      this.cambiarFoco(numeroReactivo, numeroReactivo-1);
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
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio+2);
    }
  }

  private determinarContinua(puntuacionReactivo: number, numeroReactivo: number) {
    if ((puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo + 1] == 0)) {
      this.anteriorReactivo = numeroReactivo;
      this.mensajeWarning("Se ha terminado la subprueba");
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio+2);
    }
  }

  private limpiarReactivosAnt(numeroReactivo: number) {
    this.habilitaReactivo[numeroReactivo - 2] = false;
    this.habilitaReactivo[numeroReactivo - 3] = false;
    this.listaCalificaciones[numeroReactivo - 2] = 0;
    this.listaCalificaciones[numeroReactivo - 3] = 0;
    this.cambiarFoco(numeroReactivo, this.reactivoDeInicio-1);
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    const cantidadParaDescontinuar: number = 3;
    let discontinua: boolean = puntuacionReactivo == 0
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0
      && this.listaCalificaciones[numeroReactivo - 3] == 0
      && this.listaCalificaciones[numeroReactivo - 4] == 0
      && numeroReactivo > this.reactivoDeInicio+cantidadParaDescontinuar;
    if (discontinua) {
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeWarning("Se ha terminado la subprueba");
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
    this.puntuacionEscalarService.obtenerPuntuacionEscalarConceptosConDibujos(this.globals.edad, this.subprueba.puntuacionNatural, this.globals.meses)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.router.navigate([this.globals.rutas[4]]);
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

  cambiarPorFigurasIncompletas(){
    if(this.globals.subpruebas[0]=="Figuras incompletas"){
      this.mensajeError("La subprueba figuras incompletas ya fue realizada")
    }else{
      this.globals.rutas[3]="/figuras-incompletas-wisc";
      this.globals.subpruebas[3] = "Figuras incompletas";
      this.router.navigate([this.globals.rutas[3]]);
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
