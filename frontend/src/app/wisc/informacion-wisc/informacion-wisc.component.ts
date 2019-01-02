import { Component, OnInit } from '@angular/core';
import { Subprueba } from 'src/app/model/Subprueba';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { Reactivo } from 'src/app/model/Reactivo';

@Component({
  selector: 'app-informacion-wisc',
  templateUrl: './informacion-wisc.component.html',
  styleUrls: ['./informacion-wisc.component.css']
})
export class InformacionWiscComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  primerReactivo: number = 0;
  reactivoDeInicio: number;
  anteriorReactivo: number;
  siguienteReactivo: number;
  reactivos: String[] = ["1. Pie","2. Nariz","3. Comida","4. Orejas","5. Años","6. Patas","7. Jueves","8. Monedas",
  "9. Marzo","10. Hierve","11.Semana","12. Año","13. Colón","14. Estaciones","15. Docena","16. Estómago",
  "17. Mes","18. Fósil","19. Ozono","20. Oxígeno","21. Jeroglíficos","22. Población","23. Grecia",
  "24. Oxidación","25. Hojas","26. Darwin","27. Diamantes","28. Confucio","29. Solsticio","30. Barómetro",
  "31. Fisión","32. Nueva York","33. Resina natural"];
  puntuacion: number = 0;
  listaCalificaciones: number[];
  habilitaReactivo: boolean[];    
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.criteriosDeInversion();
    this.anteriorReactivo = this.reactivoDeInicio;
    this.siguienteReactivo = this.reactivoDeInicio;
    this.subprueba.nombre = "Información";
    this.subprueba.numeroSubprueba = 13;
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 8) {
      this.reactivoDeInicio = 4;
      this.habilitaReactivo = [true,true,true,true];
      this.listaCalificaciones = [1,1,1,1];
    }
    else if (this.globals.edad >= 9 && this.globals.edad <= 11) {
      this.reactivoDeInicio = 9;
      this.habilitaReactivo = [true,true,true,true,true,true,true,true,true];
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
    this.puntuacionEscalarService.obtenerPuntuacionEscalarInformacion("20:0-24:11",this.subprueba.puntuacionNatural)
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

}
