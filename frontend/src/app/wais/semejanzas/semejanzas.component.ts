import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../../model/Reactivo';
import { Subprueba } from '../../model/Subprueba';
import { Globals } from '../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-semejanzas',
  templateUrl: './semejanzas.component.html',
  styleUrls: ['./semejanzas.component.css']
})
export class SemejanzasComponent implements OnInit {  
  siguienteReactivo = 4;
  anteriorReactivo = 4;
  reactivos: String[] = ["M. Dos - Siete", "1. Tenedor - Cuchara", "2. Amarillo - Verde",
    "3. Zanahoria - Brócoli", "*4. Caballo - Tigre", "*5. Piano - Tambor", "6. Barco - Automóvil", "7. Nariz - Lengua",
    "8. Comida - Gasolina", "9. Capullo - Bebé", "10. Ancla - Cerca", "11. Insignia - Corona", "12. Música - Marea",
    "13. Poema - Estatua", "14. Desear - Esperar", "15. Aceptación - Negación", "16. Siempre - Nunca",
    "17. Permitir - Restreingir", "18. Enemigo - Amigo"];
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  listaCalificaciones: number[] = [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  habilitaReactivo: boolean[] = [true, true, true, true, false, false, false, false, false,
    false, false, false, false, false, false];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  constructor(private globals: Globals, private route: ActivatedRoute,
    private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService) { }


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
    if (numeroReactivo == 5 && (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo - 1] < 2)) {
      this.habilitaReactivo[numeroReactivo - 2] = false;
      this.habilitaReactivo[numeroReactivo - 3] = false;
      this.listaCalificaciones[numeroReactivo - 2] = 0;
      this.listaCalificaciones[numeroReactivo - 3] = 0;
      this.cambiarFoco(numeroReactivo, 3);
    }
    else if (numeroReactivo == 2) {
      if (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo + 1] < 2) {
        this.habilitaReactivo[numeroReactivo - 1] = false;
        this.listaCalificaciones[numeroReactivo - 1] = 0;
        this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
      } else {
        this.cambiarFoco(numeroReactivo, 6);
      }
    }
    else {
      if (numeroReactivo == 3) {
        this.cambiarFoco(numeroReactivo, 2);
      }
      else if (numeroReactivo == 1) {
        if(puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo + 1] < 2){          
          this.anteriorReactivo = numeroReactivo;
          this.mensajeError("Se ha descontinuado la subprueba");
        }
        else{
          this.cambiarFoco(numeroReactivo, 6);
        }
      }
      else {        
        if(!this.discontinuar(puntuacionReactivo, numeroReactivo)){              
          this.cambiarFoco(numeroReactivo, numeroReactivo + 1);
        }               
      }
    }
  }

  cambiarFoco(numeroReactivo: number, siguienteR: number){
    this.anteriorReactivo = numeroReactivo;
    this.siguienteReactivo = siguienteR;
    this.scrollPorId("checksreactivo" + siguienteR);
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {    
    let discontinua: boolean = (puntuacionReactivo == 0 
      && this.listaCalificaciones[numeroReactivo - 1] == 0
      && this.listaCalificaciones[numeroReactivo - 2] == 0)
      && numeroReactivo > 7;
    if(discontinua){
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeError("Se ha descontinuado la subprueba");
    }    
    return discontinua;
  }

  habilitarReactivo(i): boolean {    
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return this.habilitaReactivo[i];
  }

  calificarSubprueba() {    
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.puntuacion = this.puntuacion + calificacionReactivo;      
    }            
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacion = 0;
  }  

  ngOnInit() {
    this.subprueba.nombre = "Semejanzas";
    this.subprueba.numeroSubprueba = 2;
  }

  finalizarSubprueba() {
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarSemejanzas("20:0-24:11", this.subprueba.puntuacionNatural)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.router.navigate([this.globals.rutas[2]]);
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

  mensajeError(mensaje: string) {
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
}
