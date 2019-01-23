import { Component, OnInit } from '@angular/core';
import { Reactivo } from 'src/app/model/Reactivo';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { Subprueba } from 'src/app/model/Subprueba';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-retencion-digitos-wisc',
  templateUrl: './retencion-digitos-wisc.component.html',
  styleUrls: ['./retencion-digitos-wisc.component.css']
})
export class RetencionDigitosWiscComponent implements OnInit {
  reactivoDeInicioRDI: number = 2;
  siguienteReactivo: number = 0;
  anteriorReactivo: number = 0;
  selectedRetencionDeDigitos: number;
  seCambiaraLaSubprueba: boolean = false;
  digitosRDD: String[] = ["2 - 9","4 - 6","3 - 8 - 6","6 - 1 - 2","3 - 4 - 1 - 7","6 - 1 - 5 - 8",
  "5 - 2 - 1 - 8 - 6","8 - 4 - 2 - 3 - 9","3 - 8 - 9 - 1 - 7 - 4","7 - 9 - 6 - 4 - 8 - 3",
  "5 - 1 - 7 - 4 - 2 - 3 - 8","9 - 8 - 5 - 2 - 1 - 6 - 3","1 - 8 - 4 - 5 - 9 - 7 - 6 - 3",
  "2 - 9 - 7 - 6 - 3 - 1 - 5 - 4","5 - 3 - 8 - 7 - 1 - 2 - 4 - 6 - 9","4 - 2 - 6 - 9 - 1 - 7 - 8 - 3 - 5"];
  digitosRDI: String[] = ["8 - 2","5 - 6","2 - 1","1 - 3","3 - 5","6 - 4","2 - 5 - 9","5 - 7 - 4","8 - 4 - 9 - 3",
  "7 - 2 - 9 - 6","4 - 1 - 3 - 5 - 7","9 - 7 - 8 - 5 - 2","1 - 6 - 5 - 2 - 9 - 8",
  "3 - 6 - 7 - 1 - 9 - 4","8 - 5 - 9 - 2 - 3 - 4 - 6","4 - 5 - 7 - 9 - 2 - 8 - 1",
  "6 - 9 - 1 - 7 - 3 - 2 - 5 - 8","3 - 1 - 7 - 9 - 5 - 4 - 8 - 2"];
  respuestasRDI: String[] = [];
  digitosRDS: String[] = ["1 - 2", "4 - 2", "3 - 1 - 6", "0 - 9 - 4", "8 - 7 - 9 - 2",
    "4 - 8 - 7 - 1", "2 - 6 - 9 - 1 - 7", "3 - 8 - 3 - 5 - 8", "2 - 1 - 7 - 4 - 3 - 6",
    "6 - 2 - 5 - 2 - 3 - 4", "7 - 5 - 7 - 6 - 8 - 6 - 2", "4 - 8 - 2 - 5 - 4 - 3 - 5",
    "5 - 8 - 7 - 2 - 7 - 5 - 4 - 5", "9 - 4 - 9 - 7 - 3 - 0 - 8 - 4",
    "5 - 0 - 1 - 1 - 3 - 2 - 1 - 0 - 5", "2 - 7 - 1 - 4 - 8 - 4 - 2 - 9 - 6"];
  respuestasRDS: String[] = ["1 - 2", "2 - 4", "1 - 3 - 6", "0 - 4 - 9", "2 - 7 - 8 - 9",
    "1 - 4 - 7 - 8", "1 - 2 - 6 - 7 - 9", "3 - 3 - 5 - 8 - 8", "1 - 2 - 3 - 4 - 6 - 7",
    "2 - 2 - 3 - 4 - 5 - 6", "2 - 5 - 6 - 6 - 7 - 7 - 8", "2 - 3 - 4 - 4 - 5 - 5 - 8",
    "2 - 4 - 5 - 5 - 5 - 7 - 7 - 8", "0 - 3 - 4 - 4 - 7 - 8 - 9 - 9",
    "0 - 0 - 1 - 1 - 1 - 2 - 3 - 5 - 5", "1 - 2 - 2 - 4 - 4 - 6 - 7 - 8 - 9"]
  listaCalificacionesRDD: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  listaCalificacionesRDI: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  listaCalificacionesRDS: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  
  listaCalificaciones: number[] = [];
  puntuacionRDD: number = 0;
  puntuacionRDI: number = 0;
  puntuacionRDS: number = 0;
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean;
  constructor(private globals: Globals, private route: ActivatedRoute,
    private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService) { }

  ngOnInit() {
    this.globals.idEvaluado = localStorage.getItem('idEvaluado').toString();
    this.globals.edad = Number(localStorage.getItem('anios'));     
    this.globals.meses = Number(localStorage.getItem('meses'));
    this.construirRespuestasRDI();
    this.selectedRetencionDeDigitos = 1;
  }

  construirRespuestasRDI() {
    var i = 0;
    for (let ensayo of this.digitosRDI) {
      this.respuestasRDI[i] = this.digitosRDI[i].split('').reverse().join('');
      i++;
    }
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo, numeroRD: number) {
    let descontinuado: boolean = false;
    if (numeroRD == 1) {
      this.listaCalificacionesRDD[numeroReactivo] = (puntuacionReactivo);
      this.obtenerResultadoRDD();
      descontinuado = this.descontinuar(puntuacionReactivo, numeroReactivo, this.listaCalificacionesRDD);
    }
    else if (numeroRD == 2) {
      this.listaCalificacionesRDI[numeroReactivo] = (puntuacionReactivo);
      this.obtenerResultadoRDI();
      descontinuado = this.descontinuar(puntuacionReactivo, numeroReactivo, this.listaCalificacionesRDI);
    }
    else if (numeroRD == 3) {
      this.listaCalificacionesRDS[numeroReactivo] = (puntuacionReactivo);
      this.obtenerResultadoRDS();
      descontinuado = this.descontinuar(puntuacionReactivo, numeroReactivo, this.listaCalificacionesRDS);
    }
    if(!descontinuado){
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo + 1;
      this.scrollPorId("checksreactivo" + this.siguienteReactivo);
    }    
  }  

  descontinuar(puntuacionReactivo: number, numeroReactivo: number, calificaciones: number[]): boolean {
    let descontinuado: boolean = numeroReactivo % 2 == 1
    && (puntuacionReactivo == 0 && calificaciones[numeroReactivo - 1] == 0);
    if (descontinuado) {
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeError("Se ha descontinuado la subprueba");      
    }
    return descontinuado;
  }

  obtenerResultadoRDD() {
    for (let puntuacionReactivo of this.listaCalificacionesRDD) {
      this.puntuacion = this.puntuacion + puntuacionReactivo;
    }
    this.puntuacionRDD = this.puntuacion;
    this.puntuacion = 0;
  }

  crearReactivos() {
    var i = 0;
    this.listaCalificaciones = this.listaCalificacionesRDD.concat(this.listaCalificacionesRDI).concat(this.listaCalificacionesRDS)
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.reactivoActual = new Reactivo();
      this.reactivoActual.puntuacion = calificacionReactivo;
      this.reactivosCalificados[i] = (this.reactivoActual);
      i++;
    }
  }

  obtenerResultadoRDI() {
    for (let puntuacionReactivo of this.listaCalificacionesRDI) {
      this.puntuacion = this.puntuacion + puntuacionReactivo;
    }
    this.puntuacionRDI = this.puntuacion;
    this.puntuacion = 0;
  }

  obtenerResultadoRDS() {
    for (let puntuacionReactivo of this.listaCalificacionesRDS) {
      this.puntuacion = this.puntuacion + puntuacionReactivo;
    }
    this.puntuacionRDS = this.puntuacion;
    this.puntuacion = 0;
  }

  obtenerPuntuacionTotal() {
    this.obtenerResultadoRDS();
    this.puntuacion = this.puntuacionRDD + this.puntuacionRDI + this.puntuacionRDS;
    this.selectedRetencionDeDigitos = 3;
  }

  finalizarSubprueba() {
    this.crearReactivos();
    this.subprueba.reactivos = this.reactivosCalificados;
    this.subprueba.numeroSubprueba = 3;
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.subprueba.nombre = "Retención de dígitos";
    this.puntuacionEscalarService.obtenerPuntuacionEscalarRetencionDeDigitos(this.globals.edad, this.subprueba.puntuacionNatural, this.globals.meses)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.globals.retencionDigitos = this.subprueba.puntuacionEscalar;
        this.globals.rutas[3] = '/conceptos-con-dibujos';
        this.router.navigate([this.globals.rutas[3]]);
        this.scrollToTop();
      });      
  }  

  cambiarRD(num: number): void{
    this.selectedRetencionDeDigitos=num; 
    this.siguienteReactivo = this.reactivoDeInicioRDI;
    this.anteriorReactivo = this.reactivoDeInicioRDI;
    window.scroll(0,0);
  }

  habilitarReactivo(i, n): boolean {
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
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

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  cambiarSubprueba(){
    this.globals.rutas[2]="/aritmetica-wisc";
    this.globals.subpruebas[2] = "Aritmética";
    this.router.navigate([this.globals.rutas[2]]);
  }

}
