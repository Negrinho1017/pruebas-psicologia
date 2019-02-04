import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../../model/Reactivo';
import { Subprueba } from '../../model/Subprueba';
import { Router } from '@angular/router';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from '../../globals';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-matrices',
  templateUrl: './matrices.component.html',
  styleUrls: ['./matrices.component.css']
})
export class MatricesComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  primerReactivo: number = 2;
  reactivoDeInicio: number = 5;
  siguienteReactivo = this.reactivoDeInicio;
  anteriorReactivo = this.reactivoDeInicio;
  respuestasCorrectas: number[] = [5, 4, 3, 2, 1, 5, 3, 4, 4, 5, 1, 5, 2, 3, 1, 1, 5, 2, 3, 2, 1, 4, 5, 1, 4, 2, 3, 4];
  puntuacion: number = 0;
  listaCalificaciones: number[] = [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  habilitaReactivo: boolean[] = [true, true, true, true, true, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false];
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  pruebaConsultada = false;
  puntuacionPruebaConsultada: number;
  reactivosFinalizadosPuntuacion: number[] = [];
  primerosReactivos: number[] = [0, 0, 1, 1, 1];

  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService) { }

  ngOnInit() {
    this.subprueba.numeroSubprueba = 4;
    this.subprueba.nombre = "Matrices";
    if(localStorage.getItem('pruebaConsultada') == 'true'){
      this.pruebaConsultada = true;
      this.consultarResultados();
    }
  }

  consultarResultados(){
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(<string> this.globals.idEvaluado).subscribe(
      res => {
        this.puntuacionPruebaConsultada = res.ramaDelConocimiento[1].subpruebas[1].puntuacionNatural;
        var i = 0;
        for (let reactivo of res.ramaDelConocimiento[1].subpruebas[1].reactivos) {
          if(reactivo != null){
            this.reactivosFinalizadosPuntuacion[i] = reactivo.puntuacion;
          }else{
            this.reactivosFinalizadosPuntuacion[i] = this.primerosReactivos[i] != null ? this.primerosReactivos[i] : 0;
          }
          i++;
        }
      }
    );
    this.siguienteReactivo = -1;
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number) {
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo);
    this.calificarSubprueba();
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if (numeroReactivo == this.reactivoDeInicio+1 && (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo - 1] == 0)) {
      this.limpiarReactivosAnt(numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio-2) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio-1) {
      this.cambiarFoco(numeroReactivo, numeroReactivo-1);
    }
    else if (numeroReactivo == this.primerReactivo) {
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
    if(this.pruebaConsultada){
      return this.pruebaConsultada;
    }
    else{
      return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
    }
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
    this.puntuacionEscalarService.obtenerPuntuacionEscalarMatrices(this.globals.edad, this.subprueba.puntuacionNatural)
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

  cambiarSubprueba(numeroSubprueba: number){
    if(numeroSubprueba==1){
      this.cambiarPorPesoFigurado();
    }
    if(numeroSubprueba==2){
      this.cambiarPorFigurasIncompletas();
    }   
  }

  cambiarPorPesoFigurado(){
    if(this.globals.subpruebas[0]=="Peso figurado"){
      this.mensajeError("La subprueba peso figurado ya fue realizada")
    }else{
      this.globals.rutas[3]="/peso-figurado";
      this.globals.subpruebas[3] = "Peso figurado";
      this.router.navigate([this.globals.rutas[3]]);
    }
  }

  cambiarPorFigurasIncompletas(){
    if(this.globals.subpruebas[0]=="Figuras incompletas"){
      this.mensajeError("La subprueba figuras incompletas ya fue realizada")
    }else{
      this.globals.rutas[3]="/figuras-incompletas";
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
