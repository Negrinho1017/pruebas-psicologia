import { Component, OnInit } from '@angular/core';
import { Reactivo } from 'src/app/model/Reactivo';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { Subprueba } from 'src/app/model/Subprueba';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-semejanzas-wisc',
  templateUrl: './semejanzas-wisc.component.html',
  styleUrls: ['./semejanzas-wisc.component.css']
})
export class SemejanzasWiscComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  primerReactivo: number = 1;
  reactivoDeInicio: number;
  siguienteReactivo: number;
  anteriorReactivo: number;
  reactivos: String[] = ["M. Rojo - Azul", "*1. Leche - Agua", "*2. Pluma - Lápiz", "3. Gato - Ratón",
    "4. Manzana - Plátano", "5. Camisa - Zapato", "6. Invierno - Verano", "7. Mariposa - Abeja",
    "8. Madera - Ladrillos", "9. Enojo - Alegría", "10. Poeta - Pintor", "11. Pintura - Estatua",
    "12. Montaña - Lago", "13. Hielo - Vapor", "14. Codo - Rodilla", "15. Mueca - Sonrisa",
    "16. Inundación - Sequía", "17. Primero - Último", "18. Hule - Papel", "19. Permiso - Prohibición",
    "20. Sal - Agua", "21. Venganza - Perdón", "22. Realidad - Fantasía", "23. Espacio - Tiempo", ""];
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  listaCalificaciones: number[];
  habilitaReactivo: boolean[];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  maximaPuntuacionPorReactivo: number[] = [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
  reactivosFinalizadosPuntuacion: number[] = [];
  reactivosFinalizadosRespuesta: String[] = [];
  puntuacionNaturalFinal: number;
  pruebaConsultada: boolean;
  primerosReactivos: number[];

  constructor(private globals: Globals, private route: ActivatedRoute,
    private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService) { }

  ngOnInit() {
    this.criteriosDeInversion();
    this.siguienteReactivo = this.reactivoDeInicio;
    this.anteriorReactivo = this.reactivoDeInicio;
    this.subprueba.nombre = "Semejanzas";
    this.subprueba.numeroSubprueba = 2;
    if(this.globals.pruebaTerminada){
      this.pruebaConsultada = true;
      this.consultarResultados();
      this.siguienteReactivo = -1;
    }
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 8) {
      this.reactivoDeInicio = 1;
      this.habilitaReactivo = [];
      this.listaCalificaciones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.primerosReactivos = [];
    }
    else if (this.globals.edad >= 9 && this.globals.edad <= 11) {
      this.reactivoDeInicio = 3;
      this.habilitaReactivo = [true,true,true];
      this.listaCalificaciones = [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.primerosReactivos = [0, 1, 1];
    }
    else {
      this.reactivoDeInicio = 5;
      this.habilitaReactivo = [true,true,true,true,true];
      this.listaCalificaciones = [0, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.primerosReactivos = [0, 1, 1, 2, 2];
    }
  }

  consultarResultados(){
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(<string> this.globals.idEvaluado).subscribe(
      res => {
        var i = 0;
        this.puntuacionNaturalFinal = res.ramaDelConocimiento[0].subpruebas[0].puntuacionNatural;
        for (let reactivo of res.ramaDelConocimiento[0].subpruebas[0].reactivos) {
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

  finalizarSubprueba() {
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarSemejanzas(this.globals.edad, this.subprueba.puntuacionNatural, this.globals.meses)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.router.navigate([this.globals.rutas[2]]);
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

  crearReactivos() {
    var i = 0;
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.reactivoActual = new Reactivo();
      this.reactivoActual.respuesta =
      (document.getElementById("txtRespuesta" + i) as HTMLInputElement).value;
      this.reactivoActual.puntuacion = calificacionReactivo;
      this.reactivosCalificados[i] = (this.reactivoActual);
      i++;
    }

  }

  calificarSubprueba() {
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.puntuacion = this.puntuacion + calificacionReactivo;
    }
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.crearReactivos();
    this.puntuacion = 0;
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number) {
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo);
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if (this.reactivoDeInicio != this.primerReactivo &&
      numeroReactivo == this.reactivoDeInicio + 1 && 
      (puntuacionReactivo < this.maximaPuntuacionPorReactivo[numeroReactivo] 
      || this.listaCalificaciones[numeroReactivo - 1] <  this.maximaPuntuacionPorReactivo[numeroReactivo - 1])) {
      this.limpiarReactivosAnt(numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio - 3) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio - 2) {
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

  private limpiarReactivosAnt(numeroReactivo: number) {
    this.habilitaReactivo[numeroReactivo - 2] = false;
    this.habilitaReactivo[numeroReactivo - 3] = false;
    this.listaCalificaciones[numeroReactivo - 2] = 0;
    this.listaCalificaciones[numeroReactivo - 3] = 0;
    this.cambiarFoco(numeroReactivo, this.reactivoDeInicio - 1);
  }

  private reversarInversion(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo < this.maximaPuntuacionPorReactivo[numeroReactivo] || this.listaCalificaciones[numeroReactivo + 1] < this.maximaPuntuacionPorReactivo[numeroReactivo+1]) {
      this.habilitaReactivo[numeroReactivo - 1] = false;
      this.listaCalificaciones[numeroReactivo - 1] = 0;
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio + 2);
    }
  }

  private determinarContinua(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo < this.maximaPuntuacionPorReactivo[numeroReactivo] || this.listaCalificaciones[numeroReactivo + 1] < this.maximaPuntuacionPorReactivo[numeroReactivo+1]) {
      this.anteriorReactivo = numeroReactivo;
      this.mensajeError("Se ha terminado la subprueba");
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio + 2);
    }
  }

  cambiarFoco(numeroReactivo: number, siguienteR: number) {
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    const cantidadParaDescontinuar: number = 3;
    let discontinua: boolean = (puntuacionReactivo == 0
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0)
      && numeroReactivo > this.reactivoDeInicio + cantidadParaDescontinuar;
    if (discontinua) {
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeError("Se ha terminado la subprueba");
    }
    return discontinua;
  }

  habilitarReactivo(i): boolean {
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return i < 5 ? this.habilitaReactivo[i] : false;
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

  cambiarSubprueba(numeroSubprueba: number){
    if(numeroSubprueba==1){
      this.cambiarPorInformacion();
    }
    else if(numeroSubprueba==2){
      this.cambiarPorPistas();
    }   
  }

  cambiarPorPistas(){
    this.globals.rutas[1] = "/pistas";
    this.globals.subpruebas[1] = "Pistas";
    this.router.navigate([this.globals.rutas[1]]);
  }

  cambiarPorInformacion(){
    this.globals.rutas[1] = "/informacion-wisc";
    this.globals.subpruebas[1] = "Información";
    this.router.navigate([this.globals.rutas[1]]);
  }

}
