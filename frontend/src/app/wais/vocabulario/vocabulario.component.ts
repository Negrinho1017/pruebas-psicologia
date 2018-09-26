import { Component, OnInit } from '@angular/core';
import { VocabularioService } from './vocabulario.service';
import { Reactivo } from '../../model/Reactivo';
import { Subprueba } from '../../model/Subprueba';
import { Globals } from '../../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-vocabulario',
  templateUrl: './vocabulario.component.html',
  styleUrls: ['./vocabulario.component.css']
})

export class VocabularioComponent implements OnInit {
  siguienteReactivo = 4;
  anteriorReactivo = 4;
  reactivos: String[] = ["1. Libro", "2. Avión", "3. Canasta", "*4. Manzana", "5. Finalizar", "6. Cama",
    "*7. Guante", "8. Desayuno", "9. Consumir", "10. Armar", "11. Tranquilo", "12. Meditar", "13. Remordimiento",
    "14. Evolucionar", "15. Diverso", "16. Obstruir", "17. Generar", "18. Curioso", "19. Fortaleza",
    "20. Abominable", "21. Agudo", "22. Tangible", "23. Compasión", "24. Plagiar", "25. confiar", "26. Renuente",
    "27. Osado", "28. Mitigar", "29. Pragmático", "30. Diatriba"];
  puntuacion: number = 0;
  listaCalificaciones: number[] = [1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  habilitaReactivo: boolean[] = [true, true, true, true, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false];
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;

  constructor(private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService) { }

  ngOnInit() {
    this.subprueba.nombre = "Vocabulario";
    this.subprueba.numeroSubprueba = 5;
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number) {
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo);
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
    this.calificarSubprueba();
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if (numeroReactivo == 5 
      && (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo - 1] < 2)) {
      this.habilitaReactivo[numeroReactivo - 2] = false;
      this.habilitaReactivo[numeroReactivo - 3] = false;
      this.listaCalificaciones[numeroReactivo - 2] = 0;
      this.listaCalificaciones[numeroReactivo - 3] = 0;
      this.cambiarFoco(numeroReactivo, 3);
    }
    else if (numeroReactivo == 2 || numeroReactivo == 1) {
      this.reversarInversion(puntuacionReactivo, numeroReactivo);
    }
    else {
      if (numeroReactivo == 3) {
        this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
      }
      else if (numeroReactivo == 0) {
        if (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo + 1] == 0) {
          this.anteriorReactivo = numeroReactivo;
          this.mensajeError("Se ha descontinuado la subprueba");
        }
        else {
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

  private reversarInversion(puntuacionReactivo: number, numeroReactivo: number) {
    if (puntuacionReactivo == 0 || this.listaCalificaciones[numeroReactivo + 1] < numeroReactivo) {
      this.habilitaReactivo[numeroReactivo - 1] = false;
      this.listaCalificaciones[numeroReactivo - 1] = 0;
      this.cambiarFoco(numeroReactivo, numeroReactivo - 1);
    }
    else {
      this.cambiarFoco(numeroReactivo, 6);
    }
  }

  discontinuar(puntuacionReactivo: number, numeroReactivo: number): boolean {
    let discontinua: boolean = puntuacionReactivo == 0 
    && this.listaCalificaciones[numeroReactivo - 1] == 0
    && this.listaCalificaciones[numeroReactivo - 2] == 0;
    if(discontinua){
      this.anteriorReactivo = numeroReactivo;
      this.siguienteReactivo = numeroReactivo;
      this.mensajeError("Se ha descontinuado la subprueba");
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
    this.crearReactivos();
    this.puntuacion = 0;
  }
  crearReactivos() {
    var i = 0;
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.reactivoActual = new Reactivo();
      this.reactivoActual.puntuacion = calificacionReactivo;
      this.reactivosCalificados[i] = (this.reactivoActual);
      i++;
    }
  }

  habilitarReactivo(i): boolean {
    return !(i == this.siguienteReactivo || i == this.anteriorReactivo);
  }

  checkear(i): boolean {
    return this.habilitaReactivo[i];
  }

  finalizarSubprueba() {
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarVocabulario("20:0-24:11", this.subprueba.puntuacionNatural)
      .subscribe(res => {
        this.subprueba.puntuacionEscalar = res;
        this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
        this.router.navigate(['/aritmetica']);
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
}
