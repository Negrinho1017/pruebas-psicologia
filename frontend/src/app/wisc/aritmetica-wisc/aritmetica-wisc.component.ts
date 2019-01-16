import { Component, OnInit } from '@angular/core';
import { Subprueba } from 'src/app/model/Subprueba';
import { Reactivo } from 'src/app/model/Reactivo';
import { Globals } from 'src/app/globals';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { Router } from '@angular/router';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-aritmetica-wisc',
  templateUrl: './aritmetica-wisc.component.html',
  styleUrls: ['./aritmetica-wisc.component.css']
})
export class AritmeticaWiscComponent implements OnInit {
  primerReactivo: number = 0;
  reactivoDeInicio: number;
  anteriorReactivo: number;
  siguienteReactivo: number;
  seCambiaraLaSubprueba: boolean = false;
  respuestasCorrectas: String[] = ["1, 2, 3","1, 2, 3, 4, 5","1, 2,... 10","9","2","4","5","3","6","2","7",
  "6","15","14","25","5","7","9","20","32","24","19","7","6","8.5","20","3","60","30","3","34","48","2000","40"];
  reactivos: String [] = ["1. Pájaros","2. Pollitos","3. Árboles","4. Mariposas","5 Nueces","6. Libros",
  "7. Crayolas","8. Galletas","9. Pesos","10. Pedazos","11. Caramelos","12. Lápices","13. Bicicletas",
  "14. Pelotas","15. Calcomanías","16. Vacas","17. Globos","18. Manzana","19. Plumas","20. Puntos",
  "21. Premios","22. Karate","23. Cambio","24. Observación","25. Dinero","26. Clases","26. Revistas",
  "28. Manejo","29. Carpeta","30. Temperatura","31. Juego","32. Lavado de autos",
  "33. Vuelo","34. Trabajo"];
  listaCalificaciones: number[];
  habilitaReactivo: boolean[];
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  puntuacion: number = 0;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService ) { }

  ngOnInit() {
    this.criteriosDeInversion();
    this.anteriorReactivo = this.reactivoDeInicio;
    this.siguienteReactivo = this.reactivoDeInicio;
    this.subprueba.nombre = "Aritmética";
    this.subprueba.numeroSubprueba = 14;
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 7) {
      this.reactivoDeInicio = 2;
      this.habilitaReactivo = [true,true];
      this.listaCalificaciones = [1,1,1,1];
    }
    else if (this.globals.edad >= 8 && this.globals.edad <= 9) {
      this.reactivoDeInicio = 8;
      this.habilitaReactivo = [true,true,true,true,true,true,true,true];
      this.listaCalificaciones = [1,1,1,1,1,1,1,1,1];
    }
    else {
      this.reactivoDeInicio = 11;
      this.habilitaReactivo = [true,true,true,true,true,true,true,true,true,true,true];
      this.listaCalificaciones = [1,1,1,1,1,1,1,1,1,1,1];
    }
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number){
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo); 
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if(this.reactivoDeInicio != this.primerReactivo &&
      numeroReactivo == this.reactivoDeInicio + 1 && (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo-1] == 0)){
      this.limpiarReactivosAnt(numeroReactivo);
    }    
    else if (numeroReactivo <= this.reactivoDeInicio-2 && numeroReactivo > this.primerReactivo) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio-1) {
      this.cambiarFoco(numeroReactivo, numeroReactivo-1);
    }
    else if(numeroReactivo == this.primerReactivo  && this.reactivoDeInicio != this.primerReactivo){
      this.determinarContinua(puntuacionReactivo, numeroReactivo);
    }
    else if(!this.discontinuar(puntuacionReactivo, numeroReactivo)){
      this.cambiarFoco(numeroReactivo, numeroReactivo + 1);      
    }
  }  

  private determinarContinua(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo + 1] == 0) {
      this.anteriorReactivo = numeroReactivo;
      this.mensajeWarning("Se ha descontinuado la subprueba");
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
    const cantidadParaDescontinuar: number = 4;
    let discontinua: boolean = puntuacionReactivo == 0 
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0
      && this.listaCalificaciones[numeroReactivo - 3] == 0
      && numeroReactivo > this.reactivoDeInicio+cantidadParaDescontinuar;
    if(discontinua){
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeWarning("Se ha descontinuado la subprueba");
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
    this.puntuacionEscalarService.obtenerPuntuacionEscalarAritmetica(this.globals.edad,this.subprueba.puntuacionNatural,this.globals.meses)
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
      title: 'Discontinación',
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
    if (this.globals.rutas[2] == "/aritmetica-wisc") {
      this.router.navigate([this.globals.rutas[3]]);
    }
    else if (this.globals.rutas[6] == "/aritmetica-wisc") {
      this.router.navigate([this.globals.rutas[7]]);
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
