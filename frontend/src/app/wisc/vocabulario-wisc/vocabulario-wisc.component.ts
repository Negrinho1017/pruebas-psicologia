import { Component, OnInit } from '@angular/core';
import { Reactivo } from 'src/app/model/Reactivo';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { Subprueba } from 'src/app/model/Subprueba';
import { PuntuacionEscalarWiscService } from 'src/app/puntuacion-escalar-wisc/puntuacion-escalar-wisc.service';

@Component({
  selector: 'app-vocabulario-wisc',
  templateUrl: './vocabulario-wisc.component.html',
  styleUrls: ['./vocabulario-wisc.component.css']
})
export class VocabularioWiscComponent implements OnInit {
  seCambiaraLaSubprueba: boolean = false;
  primerReactivo: number = 0;
  reactivoDeInicio: number;
  siguienteReactivo: number;
  anteriorReactivo: number;
  reactivos: String[] = ["1. Coche (Auto, Automóvil)","2. Flor","3. Tren (Ferrocarril)","4. Cubeta (balde)","5. Reloj","6. Sombrilla","7. Ladrón","8. Vaca","9. Sombrero","10. Valiente","11. Obedecer",
  "12. Bicicleta","13. Antiguo","14. Abecedario","15. Remedar","16. Fábula","17. Emigrar","18. Isla",
  "19. Absorber","20. Salir","21. Transparente","22. Molestia","23. Raramente","24. Preciso","25. Obligar",
  "26. Rivalidad","27. Disparate","28. Previsión","29. Aflicción","30. Arduo","31. Unánime","32. Dilatorio",
  "33. Enmienda","34. Inminente","35. Aberración","36. Locuaz",""];
  puntuacion: number = 0;
  listaCalificaciones: number[];
  maximaCalificacionPorReactivo: number[] = [1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
  habilitaReactivo: boolean[];
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;

  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarWiscService) { }

  ngOnInit() {
    this.globals.idEvaluado = localStorage.getItem('idEvaluado').toString();
    this.globals.edad = Number(localStorage.getItem('anios'));     
    this.globals.meses = Number(localStorage.getItem('meses'));
    this.criteriosDeInversion();
    this.siguienteReactivo = this.reactivoDeInicio;
    this.anteriorReactivo = this.reactivoDeInicio;
    this.subprueba.nombre = "Vocabulario";
    this.subprueba.numeroSubprueba = 6;
  }

  criteriosDeInversion() {
    if (this.globals.edad >= 6 && this.globals.edad <= 8) {
      this.reactivoDeInicio = 4;
      this.habilitaReactivo = [true,true,true,true];
      this.listaCalificaciones = [1, 1, 1, 1];
    }
    else if (this.globals.edad >= 9 && this.globals.edad <= 11) {
      this.reactivoDeInicio = 6;
      this.habilitaReactivo = [true,true,true,true,true,true];
      this.listaCalificaciones = [1, 1, 1, 1, 2, 2];
    }
    else {
      this.reactivoDeInicio = 8;
      this.habilitaReactivo = [true,true,true,true,true,true,true,true];
      this.listaCalificaciones = [1, 1, 1, 1, 2, 2, 2, 2];
    }
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
    if (this.reactivoDeInicio != this.primerReactivo &&
    numeroReactivo == this.reactivoDeInicio+1 && 
    (puntuacionReactivo < this.maximaCalificacionPorReactivo[numeroReactivo] || 
    this.listaCalificaciones[numeroReactivo - 1] < this.maximaCalificacionPorReactivo[numeroReactivo - 1])) {
      this.limpiarReactivosAnt(numeroReactivo);
    }
    else if (numeroReactivo <= this.reactivoDeInicio-2 && numeroReactivo > this.primerReactivo) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if (numeroReactivo == this.reactivoDeInicio-1) {
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else if (numeroReactivo == this.primerReactivo) {
      this.determinarContinua(puntuacionReactivo, numeroReactivo);
    }
    else if (!this.discontinuar(puntuacionReactivo, numeroReactivo)) {
      this.cambiarFoco(numeroReactivo, numeroReactivo + 1);
    }
  }

  private determinarContinua(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo < this.maximaCalificacionPorReactivo[numeroReactivo] || 
    this.listaCalificaciones[numeroReactivo + 1] < this.maximaCalificacionPorReactivo[numeroReactivo + 1]) {
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
    if (puntuacionReactivo < this.maximaCalificacionPorReactivo[numeroReactivo] ||
    this.listaCalificaciones[numeroReactivo + 1] < this.maximaCalificacionPorReactivo[numeroReactivo + 1]) {
      this.habilitaReactivo[numeroReactivo - 1] = false;
      this.listaCalificaciones[numeroReactivo - 1] = 0;
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else {
      this.cambiarFoco(numeroReactivo, this.reactivoDeInicio + 2);
    }
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    const cantidadParaDescontinuar: number = 3;
    let discontinua: boolean = puntuacionReactivo == 0
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0
      && numeroReactivo > this.reactivoDeInicio+cantidadParaDescontinuar;
    if (discontinua) {
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeWarning("Se ha descontinuado la subprueba");
    }
    return discontinua;
  }

  cambiarFoco(numeroReactivo: number, siguienteR: number) {
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
  }

  calificarSubprueba() {
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.puntuacion = this.puntuacion + calificacionReactivo;
    }
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacion = 0;
  }

  habilitarReactivo(i): boolean {
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return this.habilitaReactivo[i];
  }

  finalizarSubprueba() {
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarVocabulario(this.globals.edad, this.subprueba.puntuacionNatural, this.globals.meses)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.globals.rutas[6] = '/numeros-letras-wisc';
        this.router.navigate([this.globals.rutas[6]]);
        this.scrollToTop();
      });
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
    if(this.globals.rutas[1] == "/pistas"){
      this.mensajeError("La subprueba pistas ya fue realizada")
    }else{
      this.globals.rutas[5] = "/pistas";
      this.globals.subpruebas[5] = "Pistas";
      this.router.navigate([this.globals.rutas[5]]);
    }
  }

  cambiarPorInformacion(){
    if(this.globals.rutas[1] == "/informacion-wisc"){
      this.mensajeError("La subprueba información ya fue realizada")
    }else{
      this.globals.rutas[5] = "/informacion-wisc";
      this.globals.subpruebas[5] = "Información";
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

}
