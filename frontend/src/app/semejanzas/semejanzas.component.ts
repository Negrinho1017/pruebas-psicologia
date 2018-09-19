import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../model/Reactivo';
import { Subprueba } from '../model/Subprueba';
import { Globals } from '../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from '../puntuacion-escalar/puntuacion-escalar.service';

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
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  listaCalificaciones: number[] = [0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  habilitaReactivo: boolean[] = [true, true, true, true, false, false, false, false, false, 
    false, false, false, false, false, false];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;  
  constructor( private globals: Globals, private route: ActivatedRoute,
    private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }


  calificarReactivo(puntuacionReactivo: number, numeroReactivo: number){
    this.listaCalificaciones[numeroReactivo] = (puntuacionReactivo); 
    this.calificarSubprueba();
    this.aplicarInversion(puntuacionReactivo, numeroReactivo);
  }

  aplicarInversion(puntuacionReactivo: number, numeroReactivo: number): void {
    if(numeroReactivo == 5 && (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo-1] < 2)){
      this.habilitaReactivo[numeroReactivo -2] = false;
      this.habilitaReactivo[numeroReactivo - 3] = false;
      this.listaCalificaciones[numeroReactivo - 2] = 0;
      this.listaCalificaciones[numeroReactivo - 3] = 0;
    }
    if( numeroReactivo == 2 && (puntuacionReactivo < 2 || this.listaCalificaciones[numeroReactivo+1] < 2)){
      this.habilitaReactivo[numeroReactivo -1] = false;            
      this.listaCalificaciones[numeroReactivo - 1] = 0;            
    }
  }

  habilitarReactivo(i): boolean {
    return this.habilitaReactivo[i];
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
  
  ngOnInit() {
    this.subprueba.nombre = "Semejanzas";
    this.subprueba.numeroSubprueba = 2;
  }

  finalizarSubprueba(){
    this.subprueba.reactivos = this.reactivosCalificados;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarSemejanzas("20:0-24:11",this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.router.navigate(['/retencion-digitos']);
    });
    
  }

}
