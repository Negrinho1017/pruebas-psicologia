import { Component, OnInit } from '@angular/core';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { Subprueba } from 'src/app/model/Subprueba';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  puntuacionTotal: number = 0;
  puntuacion1: number = 0;
  puntuacion2: number = 0;
  correctas1: number = 0;
  correctas2: number = 0;
  incorrectas1: number = 0;  
  incorrectas2: number = 0;
  subprueba: Subprueba = new Subprueba();
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.subprueba.nombre = "Registros";
    this.subprueba.numeroSubprueba = 12;
  }

  calcularPuntuacion(){
    this.puntuacion1 = this.correctas1 - this.incorrectas1; 
    this.puntuacion2 = this.correctas2 - this.incorrectas2;
    this.puntuacionTotal = this.puntuacion1 + this.puntuacion2;
  }

  finalizarSubprueba(){
    this.subprueba.puntuacionNatural = this.puntuacionTotal;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarBusquedaSimbolos(this.globals.edad,this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      //this.globals.busquedaSimbolos = this.subprueba.puntuacionEscalar;
      this.navegar();
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

  navegar() {
    if (this.globals.rutas[4] == "/registros") {
      this.router.navigate([this.globals.rutas[5]]);
    }
    if (this.globals.rutas[9] == "/registros") {
      this.globals.ultimaSubprueba = this.subprueba;
      this.router.navigate(['/hoja-resultados-wisc']);
    }
  }

}
