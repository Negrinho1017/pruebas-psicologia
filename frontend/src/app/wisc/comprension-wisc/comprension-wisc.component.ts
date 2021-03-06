import { Component, OnInit } from '@angular/core';
import { Subprueba } from 'src/app/model/Subprueba';
import { Router, ActivatedRoute } from '@angular/router';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from 'src/app/globals';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { Reactivo } from 'src/app/model/Reactivo';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-comprension-wisc',
  templateUrl: './comprension-wisc.component.html',
  styleUrls: ['./comprension-wisc.component.css']
})
export class ComprensionWiscComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  primerReactivo: number = 0;
  reactivoDeInicio: number;
  anteriorReactivo: number;
  siguienteReactivo:number;
  reactivos: String[] = ["1. Dientes","2. Verduras","3. Cinturones de seguridad","4. Policías","5. Cartera",
  "6. Humo","7. Pelear","8. Bibliotecas","9. Inspeccionar","10. Ejercicio","11. Disculparse","12. Luces",
  "13. Derechos de autor","14. Promesa","15. Médico","16. Periódico","17. Libertad de expresión","18. Propietaria",
  "19. Estampillas","20. Comunicación","21. Ciencia y tecnología"];
  puntuacion: number = 0;
  listaCalificaciones: number[];
  habilitaReactivo: boolean[];    
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService ) { }

  ngOnInit() {
    this.criteriosDeInversion();
    this.anteriorReactivo = this.reactivoDeInicio;
    this.siguienteReactivo = this.reactivoDeInicio;
    this.subprueba.nombre = "Comprensión";
    this.subprueba.numeroSubprueba = 9;
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 8) {
      this.reactivoDeInicio = 0;
      this.habilitaReactivo = [];
      this.listaCalificaciones = [];
    }
    else if (this.globals.edad >= 9 && this.globals.edad <= 11) {
      this.reactivoDeInicio = 2;
      this.habilitaReactivo = [true,true];
      this.listaCalificaciones = [2,2];
    }
    else {
      this.reactivoDeInicio = 4;
      this.habilitaReactivo = [true,true,true,true];
      this.listaCalificaciones = [2,2,2,2];
    }
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number){
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo); 
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if(this.reactivoDeInicio != this.primerReactivo &&
      numeroReactivo == this.reactivoDeInicio + 1 && (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo-1] < 2)){
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
    if (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo + 1] < 2) {
      this.anteriorReactivo = numeroReactivo;
      this.mensajeWarning("Se ha descontinuado la subprueba");
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio+2);
    }
  }

  private reversarInversion(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo + 1] < 2) {
      this.habilitaReactivo[numeroReactivo - 1] = false;
      this.listaCalificaciones[numeroReactivo - 1] = 0;
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
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

  cambiarFoco(numeroReactivo: number, siguienteR: number){
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    const cantidadParaDescontinuar: number = 3;
    let discontinua: boolean = puntuacionReactivo == 0 
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0
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
    //ACarras se debe crear servicio para puntuacionEscalar
    this.puntuacionEscalarService.obtenerPuntuacionEscalarComprension(this.globals.edad, this.subprueba.puntuacionNatural, this.globals.meses)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.router.navigate([this.globals.rutas[9]]);
        this.scrollToTop();
      });  
  }

  habilitarReactivo(i): boolean {    
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return i < 4 ? this.habilitaReactivo[i] : false;
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

  cambiarSubprueba(numeroSubprueba: number){
    if(numeroSubprueba==1){
      this.cambiarPorInformacion();
    }
    else if(numeroSubprueba==2){
      this.cambiarPorPistas();
    }   
  }

  cambiarPorPistas(){
    if(this.globals.rutas[1] == "/pistas" || this.globals.rutas[5] == "/pistas"){
      this.mensajeError("La subprueba pistas ya fue realizada")
    }else{
      this.globals.rutas[8] = "/pistas";
      this.globals.subpruebas[8] = "Pistas";
      this.router.navigate([this.globals.rutas[8]]);
    }
  }

  cambiarPorInformacion(){
    if(this.globals.rutas[1] == "/informacion-wisc" || this.globals.rutas[5] == "/informacion-wisc"){
      this.mensajeError("La subprueba información ya fue realizada");
    }else{
      this.globals.rutas[8] = "/informacion-wisc";
      this.globals.subpruebas[8] = "Información";
      this.router.navigate([this.globals.rutas[8]]);
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
