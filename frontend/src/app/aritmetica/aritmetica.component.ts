import { Component, OnInit } from '@angular/core';
import { EnsayoRespuestaModel } from '../model/EnsayoRespuestaModel';
import { Reactivo } from '../model/Reactivo';
import { Subprueba } from '../model/Subprueba';
import { Globals } from '../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aritmetica',
  templateUrl: './aritmetica.component.html',
  styleUrls: ['./aritmetica.component.css']
})
export class AritmeticaComponent implements OnInit {
  respuestasCorrectas: String[] = ["Cuenta hasta 3","Cuenta hasta 10","6","9","2","8","5","5","5","17",
  "3","200","38","140","30","47","186","49 1/2","600","51","96","23.100"];
  reactivos: String [] = ["*1. Flores","*2. Manzanas","3. Bates","4. Pájaros","5. Correas","6. Cobijas",
  "7. Plumas","8. Juguetes","9. Libros","10. Más viejo","11. Boletos","12. Paquetes","13. Tarjetas",
  "14. Correr","15. Fila","16. Horas","+17. Minutos","18. Dulces","19. Mapas","20. Vueltas","21. Máquinas",
  "22. Correo"];
  listaCalificaciones: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean = false;
  puntuacion: number = 0;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router ) { }

  ngOnInit() {
    this.subprueba.nombre = "Aritmética";
    this.subprueba.numeroSubprueba = 6;
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
    this.router.navigate(['/busqueda-simbolos']);
  }

}
