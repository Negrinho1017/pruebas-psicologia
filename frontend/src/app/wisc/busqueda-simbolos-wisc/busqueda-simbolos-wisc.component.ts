import { Component, OnInit } from '@angular/core';
import { Subprueba } from '../../model/Subprueba';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { HojaDeResultadosService } from '../../wais/hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-busqueda-simbolos-wisc',
  templateUrl: './busqueda-simbolos-wisc.component.html',
  styleUrls: ['./busqueda-simbolos-wisc.component.css']
})
export class BusquedaSimbolosWiscComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  puntuacion: number = 0;
  correctas: number = 0;
  incorrectas: number = 0;
  subprueba: Subprueba = new Subprueba();
  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService) { }

  ngOnInit() {
    this.subprueba.nombre = "Búsqueda de símbolos";
    this.subprueba.numeroSubprueba = 10;
  }

  calcularPuntuacion() {
    this.puntuacion = this.correctas - this.incorrectas
  }

  finalizarSubprueba() {
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarBusquedaSimbolos(this.globals.edad, this.subprueba.puntuacionNatural, this.globals.meses)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.globals.ultimaSubprueba = this.subprueba;
        this.globals.busquedaSimbolos = this.subprueba.puntuacionEscalar;
        this.router.navigate(['/hoja-resultados-wisc']);
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

  cambiarSubprueba() {
    if(this.globals.subpruebas[4]=="Registros"){
      this.mensajeError("Registros ya fué realizada");
    }else{
      this.globals.rutas[9]="/registros";
      this.globals.subpruebas[9] = "Registros";
      this.router.navigate([this.globals.rutas[9]]);
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
