import { Component, OnInit } from '@angular/core';
import { Subprueba } from '../../model/Subprueba';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-busqueda-simbolos',
  templateUrl: './busqueda-simbolos.component.html',
  styleUrls: ['./busqueda-simbolos.component.css']
})
export class BusquedaSimbolosComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  puntuacion: number = 0;
  correctas: number = 0;
  incorrectas: number = 0;
  subprueba: Subprueba = new Subprueba();
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.subprueba.nombre = "Búsqueda de símbolos";
    this.subprueba.numeroSubprueba = 7;
  }

  calcularPuntuacion(){
    this.puntuacion = this.correctas - this.incorrectas
  }

  finalizarSubprueba(){
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarBusquedaSimbolos(this.globals.edad,
    this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.globals.busquedaSimbolos = this.subprueba.puntuacionEscalar;
      this.router.navigate([this.globals.rutas[7]]);
      this.scrollToTop();
    }, error => {
      this.mensajeError(error.error.mensaje);
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

  cambiarSubprueba(){
    this.globals.rutas[6]="/cancelacion";
    this.globals.subpruebas[6] = "Cancelación";
    this.router.navigate([this.globals.rutas[6]]);
  }

  mensajeError(mensaje: string) {
    swal({
      title: 'Error!',
      icon: "error",
      text: mensaje,
    });
  }

}
