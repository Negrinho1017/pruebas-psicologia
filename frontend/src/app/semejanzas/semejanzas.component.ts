import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../model/Reactivo';
import { Subprueba } from '../model/Subprueba';

@Component({
  selector: 'app-semejanzas',
  templateUrl: './semejanzas.component.html',
  styleUrls: ['./semejanzas.component.css']
})
export class SemejanzasComponent implements OnInit {
  reactivos: String[] = ["M. Dos - Siete", "1. Tenedor - Cuchara", "2. Amarillo - Verde",
  "3. Zanahoria - Brócoli", "*4. Caballo - Tigre", "*5. Piano - Tambor", "6. Barco - Automóvil", "7. Nariz - Lengua",
  "8. Comida - Gasolina", "9. Capullo - Bebé", "10. Ancla - Cerca", "11. Insignia - Corona", "12. Música - Marea",
  "13. Poema - Estatua", "14. Desear - Esperar", "15. Aceptación - Negación", "16. Siempre - Nunca",
  "17. Permitir - Restreingir","18. Enemigo - Amigo"];
  puntuacionReactivo: number = 0;
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  constructor() { }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo){
    this.reactivoActual = new Reactivo();
    this.reactivoActual.puntuacion=puntuacionReactivo;
    this.reactivosCalificados[numeroReactivo] = (this.reactivoActual);
    this.subprueba.reactivos=this.reactivosCalificados;
    if(this.reactivosCalificados[numeroReactivo].puntuacion == 0
      && this.reactivosCalificados[numeroReactivo-1].puntuacion == 0
      && this.reactivosCalificados[numeroReactivo-2].puntuacion == 0){
        this.hayDiscontinuacion = true;
      }
    this.calificarSubprueba(this.subprueba);
  }

  calificarSubprueba(subprueba: Subprueba){
      for (let reactivo of subprueba.reactivos) {
        this.puntuacion = this.puntuacion + reactivo.puntuacion;
      } 
      this.subprueba.puntuacionNatural=this.puntuacion;
      this.puntuacion = 0; 
  }
  
  ngOnInit() {
  }

}
