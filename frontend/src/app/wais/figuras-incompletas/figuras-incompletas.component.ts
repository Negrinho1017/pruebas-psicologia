import { Component, OnInit } from '@angular/core';
import { Reactivo } from 'src/app/model/Reactivo';
import { Subprueba } from 'src/app/model/Subprueba';
import { Globals } from 'src/app/globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-figuras-incompletas',
  templateUrl: './figuras-incompletas.component.html',
  styleUrls: ['./figuras-incompletas.component.css']
})
export class FigurasIncompletasComponent implements OnInit {
  reactivoDeInicio: number = 4;
  siguienteReactivo: number = this.reactivoDeInicio;
  anteriorReactivo: number = this.reactivoDeInicio;
  seCambiaraLaSubprueba: boolean = false;
  reactivos: String [] = ["M. Peine","1. Mesa","2. Espejo","3. Cara","* 4. Lentes","5. Jarra","* 6. Trotar", "7. Cuchillo","8. Árboles","9. Vaca","10. Casilleros","11. Pastel","12. Rosas","13. Cerca", "14. Karate","15. Caminata","16. Zapatos","17. Charco","18. Tienda de campaña","19. Librero","20. Automóvil","21. Avión", "22. Canasta", "23. Estufa", "24, Granja"];
  habilitaReactivo: boolean[] = [true, true, true, true, false, false, false, false, false];    
  listaCalificaciones: number[] = [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];  
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  puntuacion: number = 0;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.subprueba.nombre = "Figuras incompletas";
    this.subprueba.numeroSubprueba = 15;
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number){
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo); 
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if(numeroReactivo == this.reactivoDeInicio+1 && (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo-1] == 0)){
      this.limpiarReactivosAnt(numeroReactivo);      
    }
    else if(numeroReactivo == this.reactivoDeInicio-2){
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if(numeroReactivo == this.reactivoDeInicio-1){
      this.cambiarFoco(numeroReactivo, numeroReactivo-1);            
    }
    else if(numeroReactivo == 1){
      this.determinarContinua(puntuacionReactivo, numeroReactivo);
    }
    else if(!this.discontinuar(puntuacionReactivo, numeroReactivo)){
      this.cambiarFoco(numeroReactivo, numeroReactivo + 1);      
    }
  }

  private determinarContinua(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo + 1] == 0) {
      this.anteriorReactivo = numeroReactivo;
      this.mensajeWarning("Se ha terminado la subprueba");
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
      && numeroReactivo > this.reactivoDeInicio+4;
    if(discontinua){
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeWarning("Se ha terminado la subprueba");
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
    this.puntuacionEscalarService.obtenerPuntuacionEscalarFigurasIncompletas(this.globals.edad,this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.globals.aritmetica = this.subprueba.puntuacionEscalar;
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

  cambiarSubprueba(){
    if(this.globals.subpruebas[2]=="Sucesión de números y letras"){
      this.mensajeError("Sucesión de números y letras ya fué realizada");
    }else{
      this.globals.rutas[5]="/numeros-letras";
      this.globals.subpruebas[5] = "Sucesión de números y letras";
      this.router.navigate([this.globals.rutas[5]]);
    }  
  }

  mensajeError(mensaje: string) {
    swal({
      title: 'Error!',
      icon: "error",
      text: mensaje,
    });
  }

  navegar() {
    if (this.globals.rutas[0] == "/figuras-incompletas") {
      this.router.navigate([this.globals.rutas[1]]);
    }
    if (this.globals.rutas[3] == "/figuras-incompletas") {
      this.router.navigate([this.globals.rutas[4]]);
    }
    if (this.globals.rutas[7] == "/figuras-incompletas") {
      this.router.navigate([this.globals.rutas[8]]);
    }
  }

}
