import { Component, OnInit } from '@angular/core';
import { Reactivo } from 'src/app/model/Reactivo';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from 'src/app/globals';
import { ActivatedRoute, Router } from '@angular/router';
import { Subprueba } from 'src/app/model/Subprueba';

@Component({
  selector: 'app-comprension',
  templateUrl: './comprension.component.html',
  styleUrls: ['./comprension.component.css']
})
export class ComprensionComponent implements OnInit {
  siguienteReactivo = 2;
  anteriorReactivo = 2;
  reactivos: String[] = ["1. Relojes", "2. Ropa", "* 3. Dinero", "* 4. Sobre", "& 5. Comida", "& 6. Paises", "7. Persevera - Alcanza", "8. Historia", "& 9. Trabajo", "10. Animales", "& 11. Espacio", "12. Terreno", "13. Perro", "14. Cédula", "15. Democracia", "16. Hablador - Cojo", "17. Delito", "18. Verano"];
  habilitaReactivo: boolean[] = [true, true, false, false, false, false];
  listaCalificaciones: number[] = [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  reactivoActual: Reactivo;
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  puntuacion: number = 0;

  constructor(private globals: Globals, private route: ActivatedRoute,
    private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService) { }

  ngOnInit() {
    this.globals.idEvaluado = localStorage.getItem('idEvaluado').toString();
    this.subprueba.nombre = "Comprension";
    this.subprueba.numeroSubprueba = 13;
  }

  finalizarSubprueba() {
    this.globals.edad = Number(localStorage.getItem('anios'));
    this.globals.meses = Number(localStorage.getItem('meses'));
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarComprension(this.globals.edad, this.subprueba.puntuacionNatural)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.navegar();
        this.scrollToTop();
      });
  }

  calificarSubprueba() {
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.puntuacion = this.puntuacion + calificacionReactivo;
    }
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacion = 0;
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number) {
    this.reactivoActual = new Reactivo();
    this.reactivoActual.respuesta =
      (document.getElementById("txtRespuesta" + numeroReactivo) as HTMLInputElement).value;
    this.reactivoActual.puntuacion = puntuacionReactivo;
    this.reactivosCalificados[numeroReactivo] = this.reactivoActual;
    this.listaCalificaciones[numeroReactivo] = puntuacionReactivo;
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if (numeroReactivo == 3 
        && (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo - 1] < 2)) {
      this.limpiarReactivosAnt(numeroReactivo);
    }
    else if (numeroReactivo == 1) {
      this.cambiarFoco(numeroReactivo, 0);
    }
    else if (numeroReactivo == 0) {
      this.determinarContinua(puntuacionReactivo, numeroReactivo);
    }
    else if (!this.discontinuar(puntuacionReactivo, numeroReactivo)) {
      this.cambiarFoco(numeroReactivo, numeroReactivo + 1);
    }

  }

  private determinarContinua(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo + 1] < 2) {
      this.anteriorReactivo = numeroReactivo;
      this.mensajeError("Se ha descontinuado la subprueba");
    }
    else {
      this.cambiarFoco(numeroReactivo, 4);
    }
  }

  private limpiarReactivosAnt(numeroReactivo: number) {
    this.habilitaReactivo[numeroReactivo - 2] = false;
    this.habilitaReactivo[numeroReactivo - 3] = false;
    this.listaCalificaciones[numeroReactivo - 2] = 0;
    this.listaCalificaciones[numeroReactivo - 3] = 0;
    this.cambiarFoco(numeroReactivo, 1);
  }

  cambiarFoco(numeroReactivo: number, siguienteR: number) {
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    let discontinua: boolean = (puntuacionReactivo == 0
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0)
      && numeroReactivo > 5;
    if (discontinua) {
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeError("Se ha finalizado la subprueba");
    }
    return discontinua;
  }

  checkear(i): boolean {
    return i < 3 ? this.habilitaReactivo[i] : false;
  }

  habilitarReactivo(i): boolean {
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
      title: 'Prueba terminada',
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

  navegar() {
    if (localStorage.getItem('siguientePrueba')=='rd') {
      this.globals.rutas[2] = '/retencion-digitos';
      this.router.navigate([this.globals.rutas[2]]);
    }
    if (localStorage.getItem('siguientePrueba')=='ar') {
      this.globals.rutas[5] = '/aritmetica';
      this.router.navigate([this.globals.rutas[5]]);
    }
    if (localStorage.getItem('siguientePrueba')=='cl') {
      this.globals.rutas[9] = '/claves';
      this.router.navigate([this.globals.rutas[9]]);
    }
  }

}
