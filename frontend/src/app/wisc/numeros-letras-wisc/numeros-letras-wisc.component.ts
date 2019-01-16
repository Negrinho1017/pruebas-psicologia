import { Component, OnInit } from '@angular/core';
import { Reactivo } from 'src/app/model/Reactivo';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { Subprueba } from 'src/app/model/Subprueba';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-numeros-letras-wisc',
  templateUrl: './numeros-letras-wisc.component.html',
  styleUrls: ['./numeros-letras-wisc.component.css']
})
export class NumerosLetrasWiscComponent implements OnInit {
  anteriorReactivo = 2;
  siguienteReactivo = 2;
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  listaCalificaciones: number[] =
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  habilitaReactivo: boolean[] = [true, true, true, true, true, false, false, false, false,
    false, false, false, false, false, false];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  reactivos: String[] = ["A - 2", "B - 3","A - 3","B - 1","2 - C","C - 4","5 - E","D - 3","B - 1 - 2","1 - 3 - C","2 - A - 3",
  "D - 2 - 9","R - 5 - B","H - 9 - K","3 - E - 2","9 - J - 4","B - 5 - F","1 - C - 3 - J","5 - A - 2 - B",
  "D - 8 - M - 1","1 - B - 3 - G - 7","9 - V - 1 - T - 7","P - 3 - J - 1 - M","1 - D - 4 - E - 9 - G",
  "H - 3 - B - 4 - F - 8","7 - Q - 6 - M - 3 - Z","S - 3 - K - 4 - Y - 1 - G","7 - S - 9 - K - 1 - T - G",
  "L - 2 - J - 6 - Q - 3 - G","4 - B - 8 - R - 1 - M - 7 - H","J - 2 - U - 8 - A - 5 - C - 4",
  "6 - L - 1 - Z - 5 - H - 2 - W",""];
  numeros: String[] = ["2","3","3","1","2","4","5","3","1 - 2","1 - 3","2 - 3","2 - 9","5","9","2 - 3","4 - 9",
  "5","1 - 3","2 - 5","1 - 8","1 - 3 - 7","1 - 7 - 9","1 - 3","1 - 4 - 9","3 - 4 - 8","3 - 6 - 7","1 - 3 - 4",
  "1 - 6 - 7 - 9","2 - 5 - 6","1 - 4 - 7 - 8","2 - 4 - 5 - 8","1 - 2 - 5 - 6"];
  letras: String[] = ["A","B","A","B","C","C","E","D","B","C","A","D","B - R","H - K","E","J","B - F","C - J",
  "A - B","D - M","B - G","T - V","J - M - P","D - E - G","B - F - H","M - Q - Z","G - K - S - Y",
  "K - S - T","G - J - L - Q","B - H - M - R","A - C - J - U","H - L - W - Z"];
  respuestasPrimeroNumeros: String[] = [];
  respuestasPrimeroLetras: String[] = [];
  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService) { }

  ngOnInit() {
    this.subprueba.nombre = "Sucesión de números y letras";
    this.subprueba.numeroSubprueba = 7;
    this.crearRespuestas();
  }

  crearRespuestas(){
    var i = 0;
    for (let numeros of this.numeros) {
      this.respuestasPrimeroNumeros[i] = numeros + " - " + this.letras[i];
      this.respuestasPrimeroLetras[i] = this.letras[i] + " - " + numeros;
      i++;
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
    this.reactivoActual.puntuacion = puntuacionReactivo;
    this.reactivosCalificados[numeroReactivo] = this.reactivoActual;
    this.listaCalificaciones[numeroReactivo] = puntuacionReactivo;
    const siguienteR: number = numeroReactivo + 1;
    this.calificarSubprueba();
    if (!this.discontinuar(puntuacionReactivo, numeroReactivo)) {
      this.cambiarFoco(numeroReactivo, siguienteR);
    }
  }

  cambiarFoco(numeroReactivo: number, siguienteR: number) {
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    
    let discontinua: boolean = puntuacionReactivo == 0
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0
      && numeroReactivo > 3 && ((numeroReactivo-1) % 3) == 0;

    if (discontinua) {
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeAlerta("Se ha descontinuado la subprueba");
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
    this.puntuacionEscalarService.obtenerPuntuacionEscalarNumerosLetras(this.globals.edad, this.subprueba.puntuacionNatural, this.globals.meses)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.router.navigate([this.globals.rutas[7]]);
        console.log("escalar: " + this.subprueba.puntuacionEscalar);
        this.scrollToTop();
      });
  }

  navegar() {
    if (this.globals.rutas[2] == "/numeros-letras") {
      this.router.navigate([this.globals.rutas[3]]);
    }
    if (this.globals.rutas[5] == "/numeros-letras") {
      this.router.navigate([this.globals.rutas[6]]);
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  getReactivoSiguiente(): number {
    return this.siguienteReactivo;
  }

  scrollPorId(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  cambiarSubprueba(){
    if(this.globals.rutas[2] == "/aritmetica-wisc"){
      this.mensajeError("La subprueba aritmética ya fue realizada");
    }else{
      this.globals.rutas[6]="/aritmetica-wisc";
      this.globals.subpruebas[6] = "Aritmética";
      this.router.navigate([this.globals.rutas[6]]);
    } 
  }

  mensajeAlerta(mensaje: string) {
    swal({
      title: 'Discontinación',
      icon: "warning",
      text: mensaje,
    });
  }

  mensajeError(mensaje: string) {
    swal({
      title: 'Error!!',
      icon: "error",
      text: mensaje,
    });
  }

}
