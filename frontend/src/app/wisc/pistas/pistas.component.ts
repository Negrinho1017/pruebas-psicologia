import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { Router } from '@angular/router';
import { Subprueba } from 'src/app/model/Subprueba';
import { Reactivo } from 'src/app/model/Reactivo';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-pistas',
  templateUrl: './pistas.component.html',
  styleUrls: ['./pistas.component.css']
})
export class PistasComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  primerReactivo: number = 2;
  reactivoDeInicio: number;
  anteriorReactivo: number;
  siguienteReactivo: number;
  primerosReactivos: String[] = ['Este es un animal que hace "guau"','Esto tiene un palo y una melena (Mechas)','Sirve para secarte después de que te bañas',
  'Sirve para oler cosas','Es un satélite natural','Este es un animal con trompa y grandes orejas','Se pone en la cabeza para protegerse del frio o del sol',
  'Tiene una perilla o picaporte y la gente puede abrirla para pasar','Mezcla de tierra con la lluvia',
  'Tiene cosas del pasado o antiguas','Líquido de colores','Esta es una habitación donde la gente duerme',
  'Proviene de los charcos/estanques de la costa del mar','Nacen al pie de las montañas','Son los responsables de que tu cuerpo funcione',
  'Conduce a nuevos descubrimientos','Facilita la convivencia de las personas que son diferentes',
  'Son normas que debe respetar el ciudadano','La gente lo hace para arreglar edificios viejos',
  'No se detiene','Es un permiso oficial','Lo festejas','Nunca se ha visto','Este es un lugar','Puede ser un rio',
  'Ha pasado'];
  segundosReactivos: String[] = ['','y sirve para barrer el piso','','','y solo lo puedes ver en la noche','','','',
  'y puedes manchar con esto tu ropa o el piso','y en este lugar se exhiben cosas interesantes','y se usa para poner en las paredes',
  '','y es útil para (aderezar, condimentar, sazonar) los alimentos','y por lo general desembocan en el oceano',
  'y algunos de ellos se pueden transplantar','y comprende un proceso con una serie de pasos','Se rompe cuando hay conflictos sociales','y están escritas con el fin de proteger a la sociedad',
  'y se hace para devolver el aspecto original a algo','No se toca','por lo general lo otorga una autoridad',
  'aumenta cada año','mejora nuestras vidas','y te protege de los cambios del clima','y las guerras pueden cambiarlo',
  'y se puede contar'];
  tercerosReactivos: String[] = ['','','','','','','','','','','','','','','','y puede incluir experimentos','y es algo que la ONU y muchos gobiernos tratan de mantener',
  '','','y se puede medir','y puede ser que hagas un examen para obtenerlo','y te hace más grande',
  'y puede provocar que la gente gane premios','y se halla dentro de otra cosa','y dos países pueden compartirlo',
  'y otorga lecciones a la gente'];
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
    this.subprueba.nombre = "Pistas";
    this.subprueba.numeroSubprueba = 15;
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 9) {
      this.reactivoDeInicio = 2;
      this.habilitaReactivo = [true,true];
      this.listaCalificaciones = [0,0];
    } else {
      this.reactivoDeInicio = 6;
      this.habilitaReactivo = [true,true,true,true,true,true];
      this.listaCalificaciones = [0,0,1,1,1,1];
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
      && this.listaCalificaciones[numeroReactivo - 3] == 0
      && this.listaCalificaciones[numeroReactivo - 4] == 0
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
    this.puntuacionEscalarService.obtenerPuntuacionEscalarInformacion(this.globals.edad,this.subprueba.puntuacionNatural, this.globals.meses)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.navegar();
      this.scrollToTop();
    });    
  }

  habilitarReactivo(i): boolean {    
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return i < 11 ? this.habilitaReactivo[i] : false;
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

  cambiarSubprueba(){
    if(this.globals.subpruebas[1]=="Comprensión" || this.globals.subpruebas[4]=="Comprensión"){
      this.mensajeError("Comprensión ya fué realizada");
    }else{
      this.globals.rutas[8]="/comprension";
      this.globals.subpruebas[8] = "Comprensión";
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

  navegar() {
    if (this.globals.rutas[1] == "/pistas") {
      this.router.navigate([this.globals.rutas[2]]);
    }
    if (this.globals.rutas[5] == "/pistas") {
      this.router.navigate([this.globals.rutas[6]]);
    }
    if (this.globals.rutas[8] == "/pistas") {
      this.router.navigate([this.globals.rutas[9]]);
    }
  }


}
