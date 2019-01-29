import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../../model/Reactivo';
import { Subprueba } from '../../model/Subprueba';
import { Globals } from '../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-retencion-digitos',
  templateUrl: './retencion-digitos.component.html',
  styleUrls: ['./retencion-digitos.component.css']
})
export class RetencionDigitosComponent implements OnInit {
  siguienteReactivo: number = 0;
  anteriorReactivo: number = 0;
  selectedRetencionDeDigitos: number;
  seCambiaraLaSubprueba: boolean = false;
  digitosRDD: String[] = ["9 - 7", "6 - 3", "5 - 8 - 2", "6 - 9 - 4", "7 - 2 - 8 - 6", "6 - 4 - 3 - 9"
    , "4 - 2 - 7 - 3 - 1", "7 - 5 - 8 - 3 - 6", "3 - 9 - 2 - 4 - 8 - 7",
    "6 - 1 - 9 - 4 - 7 - 3", "6 - 9 - 1 - 7 - 4 - 2 - 8", "4 - 1 - 7 - 9 - 3 - 8 - 6"
    , "3 - 8 - 2 - 9 - 6 - 1 - 7 - 4", "5 - 8 - 1 - 3 - 2 - 6 - 4 - 7", "2 - 7 - 5 - 8 - 6 - 3 - 1 - 9 - 4",
    "7 - 1 - 3 - 9 - 4 - 2 - 5 - 6 - 8"];
  digitosRDI: String[] = ["3 - 1", "2 - 4", "4 - 6", "5 - 7", "6 - 2 - 9 ", "4 - 7 - 5", "8 - 2 - 7 - 9",
    "4 - 9 - 6 - 8", "6 - 5 - 8 - 4 - 3", "1 - 5 - 4 - 8 - 6", "5 - 3 - 7 - 4 - 1 - 8",
    "7 - 2 - 4 - 8 - 5 - 6", "8 - 1 - 4 - 9 - 3 - 6 - 2", "4 - 7 - 3 - 9 - 6 - 2 - 8",
    "9 - 4 - 3 - 7 - 6 - 2 - 1 - 8", "7 - 2 - 8 - 1 - 5 - 6 - 4 - 3"];
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
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService) { }

  ngOnInit() {
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
    this.puntuacion = this.puntuacionRDD + this.puntuacionRDI + this.puntuacionRDS;
    this.selectedRetencionDeDigitos = 4;
  }

  finalizarSubprueba() {
    this.crearReactivos();
    this.subprueba.reactivos = this.reactivosCalificados;
    this.subprueba.numeroSubprueba = 3;
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.subprueba.nombre = "Retención de dígitos";
    this.puntuacionEscalarService.obtenerPuntuacionEscalarRetencionDigitos(this.globals.edad, this.subprueba.puntuacionNatural)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.globals.retencionDigitos = this.subprueba.puntuacionEscalar;
        this.router.navigate([this.globals.rutas[3]]);
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

  cambiarRD(num: number): void{
    this.selectedRetencionDeDigitos=num; 
    this.siguienteReactivo = 0;
    this.anteriorReactivo = 0;
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

  cambiarSubprueba(){
    this.globals.rutas[2]="/numeros-letras";
    this.globals.subpruebas[2] = "Sucesión de números y letras";
    this.router.navigate([this.globals.rutas[2]]);
  }
}
