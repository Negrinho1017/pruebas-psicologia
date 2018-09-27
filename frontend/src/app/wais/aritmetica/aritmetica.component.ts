import { Component, OnInit } from '@angular/core';
import { EnsayoRespuestaModel } from '../../model/EnsayoRespuestaModel';
import { Reactivo } from '../../model/Reactivo';
import { Subprueba } from '../../model/Subprueba';
import { Globals } from '../../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-aritmetica',
  templateUrl: './aritmetica.component.html',
  styleUrls: ['./aritmetica.component.css']
})
export class AritmeticaComponent implements OnInit {
  siguienteReactivo: number = 6;
  anteriorReactivo: number = 6;
  respuestasCorrectas: String[] = ["3","Cuenta hasta 3","Cuenta hasta 10","6","9","2","8","5","5","5","17",
  "3","200","38","140","30","47","186","49 1/2","600","51","96","23.100"];
  reactivos: String [] = ["M. Pelotas","*1. Flores","*2. Manzanas","3. Bates","4. Pájaros","5. Correas","6. Cobijas",
  "7. Plumas","8. Juguetes","9. Libros","10. Más viejo","11. Boletos","12. Paquetes","13. Tarjetas",
  "14. Correr","15. Fila","16. Horas","+17. Minutos","18. Dulces","19. Mapas","20. Vueltas","21. Máquinas",
  "22. Correo"];
  listaCalificaciones: number[] = [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  habilitaReactivo: boolean[] = [true, true, true, true, true, true, false, false, false, 
    false, false, false, false, false, false];
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  puntuacion: number = 0;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.subprueba.nombre = "Aritmética";
    this.subprueba.numeroSubprueba = 6;
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number){
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo); 
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if(numeroReactivo == 7 && (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo-1] == 0)){
      this.habilitaReactivo[numeroReactivo -2] = false;
      this.habilitaReactivo[numeroReactivo - 3] = false;
      this.listaCalificaciones[numeroReactivo - 2] = 0;
      this.listaCalificaciones[numeroReactivo - 3] = 0;
      this.cambiarFoco(numeroReactivo, 5);
    }
    else if(numeroReactivo == 4 || numeroReactivo == 3 || numeroReactivo == 2){
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else if(numeroReactivo == 1){
      if(puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo+1] == 0){
        this.anteriorReactivo = numeroReactivo;
        this.mensajeError("Se ha descontinuado la subprueba");
      }
      else{
        this.cambiarFoco(numeroReactivo, 8);
      }
    }
    else if(numeroReactivo == 5){
      this.cambiarFoco(numeroReactivo, numeroReactivo-1);            
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
      this.cambiarFoco(numeroReactivo, 8);
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
      && numeroReactivo > 9;
    if(discontinua){
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeError("Se ha descontinuado la subprueba");
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
    this.puntuacionEscalarService.obtenerPuntuacionEscalarAritmetica("20:0-24:11",this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.router.navigate(['/busqueda-simbolos']);
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

  mensajeError(mensaje: string) {
    swal({
      title: 'Discontinación',
      icon: "warning",
      text: mensaje,
    });
  }

}
