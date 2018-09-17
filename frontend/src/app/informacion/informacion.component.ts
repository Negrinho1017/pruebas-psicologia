import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../model/Reactivo';
import { Subprueba } from '../model/Subprueba';
import { Globals } from '../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  reactivos: String[] = ["*1. Lunes", "*2. Forma", "+3. Termómetro", "+4. Segundos", "5. Agua",
  "*6. Brasil","7. Emiliano Zapata","8. Italia","9. El quijote de la mancha","10. Cleopatra","11. Sahara",
  "12. Línea","13. Olimpiadas","14. Revolución mexicana","15. La malinche","16. Relatividad","17. Gandhi",
  "18. Hervir","19. Órgano","20. Lengua","21. Catalina","*22. Vasos sanguíneos","23. Sherlock Holmes",
  "*24. Minutos","25. Alicia","*26. Circunferencia"];
  puntuacion: number = 0;
  listaCalificaciones: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router ) { }

  ngOnInit() {
    this.subprueba.nombre = "Información";
    this.subprueba.numeroSubprueba = 9;
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number){
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo); 
    this.calificarSubprueba();
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
    this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
    this.router.navigate(['/claves']);
  }

}
