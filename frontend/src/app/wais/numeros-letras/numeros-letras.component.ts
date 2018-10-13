import { Component, OnInit } from '@angular/core';
import { Subprueba } from 'src/app/model/Subprueba';
import { Reactivo } from 'src/app/model/Reactivo';
import { Router } from '@angular/router';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-numeros-letras',
  templateUrl: './numeros-letras.component.html',
  styleUrls: ['./numeros-letras.component.css']
})
export class NumerosLetrasComponent implements OnInit {
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
  primerosReactivos: String[] = ["C - 1","A - 4","2 - B","D - 1","4 - C","E - 5","3 - A","C - 1"];
  primerasRespuestas: String [] = ["1 - C","4 - A","2 - B","1 - D","4 - C","5 - E","3 - A","1 - C"];
  reactivos: String[] = ["2 - B - 1","D - 5 - A","2 - B - 4","5 - C - A","3 - 2 - A","F - E - 1",
  "1 - G - 7","H - 9 - 4","3 - Q - 7","Z - 8 - N","M - 6 - U","P - 3 - N","V - 1 - J - 5","7 - X - 4 - G",
  "S - 9 - T - 6","5 - Q - 3 - H - 6","8 - E - 6 - F - 1","K - 4 - C - 2 - S","M - 4 - P - 7 - R - 2",
  "6 - N - 9 - J - 2 - S","U - 6 - H - 5 - F - 3","R - 7 - V - 4 - Y - 8 - F","9 - X - 2 - J - 3 - N - 7",
  "M - 1 - Q - 8 - R - 4 - D","6 - P - 7 - S - 2 - N - 9 - A","U - 1 - R - 9 - X - 4 - K - 3",
  "7 - M - 2 - T - 6 - F - 9 - A"];
  respuestas: String[] = ["1 - 2 - B","5 - A - D","2 - 4 - B","5 - A - C,    A - C - 5","2 - 3 - A, A - 2 - 3",
  "1 - E - F, E - F - 1","1 - 7 - G, G - 1 - 7","4 - 9 - H, H - 4 - 9","3 - 7 - Q, Q - 3 - 7",
  "8 - N - Z, N - Z - 8","6 - M - U, M - U - 6","3 - N - P, N - P - 3","1 - 5 - J - V, J - V - 1 - 5",
  "4 - 7 - G - X, G - X - 4 - 7","6 - 9 - S - T, S - T - 6 - 9","3 - 5 - 6 - H - Q, H - Q - 3 - 5 - 6",
  "1 - 6 - 8 - E - F, E - F - 1 - 6 - 8","2 - 4 - C - K - S, C - K - S - 2 - 4",
  "2 - 4 - 7 - M - P - R, M - P - R - 2 - 4 - 7","2 - 6 - 9 - J - N - S, J - N - S - 2 - 6 - 9",
  "3 - 5 - 6 - F - H - U, F - J - U - 3 - 5 - 6","4 - 7 - 8 - F - R - V - Y, F - R - V - Y - 4 - 7 - 8",
  "2 - 3 - 7 - 9 - J - N - X, J - N - X - 2 - 3 - 7 - 9","1 - 4 - 8 - D - M - Q - R, D - M - Q - R - 1 - 4 - 8",
  "2 - 6 - 7 - 9 - A - N - P - S, A - N - P - S - 2 - 6 - 7 - 9",
  "1 - 3 - 4 - 9 - K - R - U - X, K - R - U - X - 1 - 3 - 4 - 9",
  "2 - 6 - 7 - 9 - A - F - M - Y - T,  A - F - M - T - 2 - 6 - 7 - 9"];  
  
  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService) { }

  ngOnInit() {
    this.subprueba.nombre = "Sucesión de números y letras";
    this.subprueba.numeroSubprueba = 11;
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
    const siguienteR: number = numeroReactivo == 7 ? 10 : numeroReactivo+1;
    this.cambiarFoco(numeroReactivo, siguienteR);          
    this.calificarSubprueba();
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
        this.router.navigate([this.globals.rutas[1]]);
        this.scrollToTop();
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

}
