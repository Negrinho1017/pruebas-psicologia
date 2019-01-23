import { Component, OnInit } from '@angular/core';
import { Reactivo } from 'src/app/model/Reactivo';
import { Subprueba } from 'src/app/model/Subprueba';
import { Globals } from 'src/app/globals';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-figuras-incompletas-wisc',
  templateUrl: './figuras-incompletas-wisc.component.html',
  styleUrls: ['./figuras-incompletas-wisc.component.css']
})
export class FigurasIncompletasWiscComponent implements OnInit {  
  primerReactivo: number = 1;
  reactivoDeInicio: number = 5;
  siguienteReactivo: number = this.reactivoDeInicio;
  anteriorReactivo: number = this.reactivoDeInicio;
  seCambiaraLaSubprueba: boolean = false;
  reactivos: String [] = ["M. Lapiz","+1. Zorro","+2. Chaqueta","3. Gato","4. Espejo","5. Hoja","6. Campana", "7. Mano","8. Salto","9. Escalera","10. Cara de mujer","11. Cinturón","12. Hombre","13. Mueble", "14. Puerta","15. Tijeras","16. Reloj","17. Foco","18. Silbato","19. Bicicletas","20. Cerdo","21. Dado", "22. Pelota", "23. Banda", "24, Bicicleta", "*25. Naranja", "26. Perfil", "27. Árbol", "28. Puente", "29. Sombrilla", "30. Supermercado", "31. Tina", "32. Enrejado", "33. Termómetro", "34. Pez", "35. Casa", "36. Agua", "37. Familia", "38. Zapato"];
  habilitaReactivo: boolean[] = [true, true, true, true, true, false, false, false, false];    
  listaCalificaciones: number[] = [0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];  
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  puntuacion: number = 0;

  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService ) { }

  ngOnInit() {
    this.globals.idEvaluado = localStorage.getItem('idEvaluado').toString();
    this.globals.edad = Number(localStorage.getItem('anios'));     
    this.globals.meses = Number(localStorage.getItem('meses'));
    this.criteriosDeInversion();
    this.siguienteReactivo = this.reactivoDeInicio;
    this.anteriorReactivo = this.reactivoDeInicio;
    this.subprueba.nombre = "Figuras incompletas";
    this.subprueba.numeroSubprueba = 11;
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 8) {
      this.reactivoDeInicio = 1;
      this.habilitaReactivo = [true];
      this.listaCalificaciones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else if (this.globals.edad >= 9 && this.globals.edad <= 11) {
      this.reactivoDeInicio = 5;
      this.habilitaReactivo = [true,true,true,true,true];
      this.listaCalificaciones = [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    else {
      this.reactivoDeInicio = 10;
      this.habilitaReactivo = [true,true,true,true,true,true,true,true,true,true];
      this.listaCalificaciones = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }
  
  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number){
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo); 
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if(this.reactivoDeInicio != this.primerReactivo &&
      numeroReactivo == this.reactivoDeInicio + 1 && (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo - 1] == 0)) {
      this.limpiarReactivosAnt(numeroReactivo);
    }
    else if (numeroReactivo <= this.reactivoDeInicio-2 && numeroReactivo > this.primerReactivo) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio-1) {
      this.cambiarFoco(numeroReactivo, numeroReactivo-1);
    }
    else if (numeroReactivo == this.primerReactivo && this.reactivoDeInicio != this.primerReactivo) {
      this.determinarContinua(puntuacionReactivo, numeroReactivo);
    }
    else if (!this.discontinuar(puntuacionReactivo, numeroReactivo)) {
      this.cambiarFoco(numeroReactivo, numeroReactivo + 1);
    }
  }

  private determinarContinua(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo + 1] == 0) {
      this.anteriorReactivo = numeroReactivo;
      this.mensajeWarning("Se ha finalizado la subprueba");
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio+2);
    }
  }

  private limpiarReactivosAnt(numeroReactivo: number) {
    this.habilitaReactivo[numeroReactivo - 2] = false;
    this.habilitaReactivo[numeroReactivo - 3] = false;
    this.listaCalificaciones[numeroReactivo - 2] = 0;
    this.listaCalificaciones[numeroReactivo - 3] = 0;
    this.cambiarFoco(numeroReactivo, this.reactivoDeInicio-1);
  }

  private reversarInversion(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo + 1] == 0) {
      this.habilitaReactivo[numeroReactivo - 1] = false;
      this.listaCalificaciones[numeroReactivo - 1] = 0;
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio+2);
    }
  }

  cambiarFoco(numeroReactivo: number, siguienteR: number){
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    let discontinua: boolean = puntuacionReactivo == 0 
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0
      && this.listaCalificaciones[numeroReactivo - 3] == 0
      && this.listaCalificaciones[numeroReactivo - 4] == 0
      && this.listaCalificaciones[numeroReactivo - 5] == 0
      && numeroReactivo > this.reactivoDeInicio + 6;
    if(discontinua){
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeWarning("Se ha finalizado la subprueba");
    }
    return discontinua;
  }
  
  calificarSubprueba(){
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.puntuacion = this.puntuacion + calificacionReactivo;
    } 
    this.subprueba.puntuacionNatural=this.puntuacion;
    this.crearReactivos();
    this.puntuacion = 0; 
  }

  crearReactivos(){
    var i = 0;
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.reactivoActual = new Reactivo();
      this.reactivoActual.puntuacion=calificacionReactivo;
      this.reactivosCalificados[i] = (this.reactivoActual);
      i++;
    }
  }

  finalizarSubprueba(){
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarFigurasIncompletas(this.globals.edad,this.subprueba.puntuacionNatural, this.globals.meses)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.globals.aritmetica = this.subprueba.puntuacionEscalar;
      this.navegar();
      this.scrollToTop();
    }); 
  }

  habilitarReactivo(i): boolean {    
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return this.habilitaReactivo[i];
  }

  getReactivoSiguiente(): number {
    return this.siguienteReactivo;
  }

  scrollPorId(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  mensajeWarning(mensaje: string) {
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

  mensajeError(mensaje: string) {
    swal({
      title: 'Error!',
      icon: "error",
      text: mensaje,
    });
  }

  navegar() {
    if (localStorage.getItem('siguientePrueba')=='se') {
      this.globals.rutas[1] = "/semejanzas-wisc";
      this.router.navigate([this.globals.rutas[1]]);
    }
    if (localStorage.getItem('siguientePrueba')=='cl') {
      this.globals.rutas[4] = "/claves-wisc";
      this.router.navigate([this.globals.rutas[4]]);
    }
    if (localStorage.getItem('siguientePrueba')=='co') {
      this.globals.rutas[8] = "/comprension-wisc";
      this.router.navigate([this.globals.rutas[8]]);
    }
  }


}
