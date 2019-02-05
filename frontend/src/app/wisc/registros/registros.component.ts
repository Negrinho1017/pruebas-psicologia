import { Component, OnInit } from '@angular/core';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { Subprueba } from 'src/app/model/Subprueba';
import { Reactivo } from 'src/app/model/Reactivo';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

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
  pruebaConsultada = false;
  puntuacionPruebaConsultada: number;

  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService ) { }

  ngOnInit() {
    this.subprueba.nombre = "Registros";
    this.subprueba.numeroSubprueba = 12;
    if (this.globals.pruebaTerminada==true) {
      this.pruebaConsultada = true;
      this.consultarResultados();
    }
  }

  consultarResultados() {
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(<string>this.globals.idEvaluado).subscribe(
      res => {
        if (res.ramaDelConocimiento[3].subpruebas[0].nombre === "Registros") {
          this.puntuacionPruebaConsultada = res.ramaDelConocimiento[3].subpruebas[0].puntuacionNatural;
          this.correctas1 = res.ramaDelConocimiento[3].subpruebas[0].reactivos[2] != null ? res.ramaDelConocimiento[3].subpruebas[0].reactivos[2].puntuacion : 0;
          this.incorrectas1 = res.ramaDelConocimiento[3].subpruebas[0].reactivos[3] != null ? res.ramaDelConocimiento[3].subpruebas[0].reactivos[3].puntuacion : 0;
          this.correctas2 = res.ramaDelConocimiento[3].subpruebas[0].reactivos[4] != null ? res.ramaDelConocimiento[3].subpruebas[0].reactivos[4].puntuacion : 0;
          this.incorrectas2 = res.ramaDelConocimiento[3].subpruebas[0].reactivos[5] != null ? res.ramaDelConocimiento[3].subpruebas[0].reactivos[5].puntuacion : 0;
          this.calcularPuntuacion();
        }

        else if (res.ramaDelConocimiento[3].subpruebas[1].nombre === "Registros") {
          this.puntuacionPruebaConsultada = res.ramaDelConocimiento[3].subpruebas[1].puntuacionNatural;
          this.correctas1 = res.ramaDelConocimiento[3].subpruebas[1].reactivos[2] != null ? res.ramaDelConocimiento[3].subpruebas[1].reactivos[2].puntuacion : 0;
          this.incorrectas1 = res.ramaDelConocimiento[3].subpruebas[1].reactivos[3] != null ? res.ramaDelConocimiento[3].subpruebas[1].reactivos[3].puntuacion : 0;
          this.correctas2 = res.ramaDelConocimiento[3].subpruebas[1].reactivos[4] != null ? res.ramaDelConocimiento[3].subpruebas[1].reactivos[4].puntuacion : 0;
          this.incorrectas2 = res.ramaDelConocimiento[3].subpruebas[1].reactivos[5] != null ? res.ramaDelConocimiento[3].subpruebas[1].reactivos[5].puntuacion : 0;
          this.calcularPuntuacion();
        }
        
      }
    );
  }

  calcularPuntuacion(){
    this.puntuacion1 = this.correctas1 - this.incorrectas1; 
    this.puntuacion2 = this.correctas2 - this.incorrectas2;
    this.puntuacionTotal = this.puntuacion1 + this.puntuacion2;
  }

  finalizarSubprueba(){
    this.subprueba.puntuacionNatural = this.puntuacionTotal;
    this.subprueba.reactivos = [];
    this.subprueba.reactivos[0] = new Reactivo();
    this.subprueba.reactivos[0].puntuacion = this.correctas1 - this.incorrectas1;
    this.subprueba.reactivos[1] = new Reactivo();
    this.subprueba.reactivos[1].puntuacion = this.correctas2 - this.incorrectas2;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarRegistros(this.globals.edad,this.subprueba.puntuacionNatural,this.globals.meses)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.subprueba.reactivos[2] = new Reactivo();
      this.subprueba.reactivos[3] = new Reactivo();
      this.subprueba.reactivos[4] = new Reactivo();
      this.subprueba.reactivos[5] = new Reactivo();
      this.subprueba.reactivos[2].puntuacion = this.correctas1;
      this.subprueba.reactivos[3].puntuacion = this.incorrectas1;
      this.subprueba.reactivos[4].puntuacion = this.correctas2;
      this.subprueba.reactivos[5].puntuacion = this.incorrectas2;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.navegar();
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
