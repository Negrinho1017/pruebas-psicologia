import { Component, OnInit } from '@angular/core';
import { EnsayoRespuestaModel } from '../model/EnsayoRespuestaModel';
import { Reactivo } from '../model/Reactivo';
import { Subprueba } from '../model/Subprueba';

@Component({
  selector: 'app-retencion-digitos',
  templateUrl: './retencion-digitos.component.html',
  styleUrls: ['./retencion-digitos.component.css']
})
export class RetencionDigitosComponent implements OnInit {
  selectedRetencionDeDigitos: number;
  digitosRDD: String[] = ["9 - 7","6 - 3","5 - 8 - 2","6 - 9 - 4","7 - 2 - 8 - 6","6 - 4 - 3 - 9"
  ,"4 - 2 - 7 - 3 - 1","7 - 5 - 8 - 3 - 6","3 - 9 - 2 - 4 - 8 - 7",
  "6 - 1 - 9 - 4 - 7 - 3","6 - 9 - 1 - 7 - 4 - 2 - 8","4 - 1 - 7 - 9 - 3 - 8 - 6"
  ,"3 - 8 - 2 - 9 - 6 - 1 - 7 - 4","5 - 8 - 1 - 3 - 2 - 6 - 4 - 7","2 - 7 - 5 - 8 - 6 - 3 - 1 - 9 - 4",
  "7 - 1 - 3 - 9 - 4 - 2 - 5 - 6 - 8"];
  digitosRDI: String[] = ["3 - 1","2 - 4","4 - 6","5 - 7","6 - 2 - 9 ","4 - 7 - 5","8 - 2 - 7 - 9",
  "4 - 9 - 6 - 8","6 - 5 - 8 - 4 - 3","1 - 5 - 4 - 8 - 6","5 - 3 - 7 - 4 - 1 - 8",
  "7 - 2 - 4 - 8 - 5 - 6","8 - 1 - 4 - 9 - 3 - 6 - 2","4 - 7 - 3 - 9 - 6 - 2 - 8",
  "9 - 4 - 3 - 7 - 6 - 2 - 1 - 8","7 - 2 - 8 - 1 - 5 - 6 - 4 - 3"];
  respuestasRDI: String[] = [];
  digitosRDS: String[] = ["1 - 2","4 - 2","3 - 1 - 6","0 - 9 - 4","8 - 7 - 9 - 2",
  "4 - 8 - 7 - 1","2 - 6 - 9 - 1 - 7","3 - 8 - 3 - 5 - 8","2 - 1 - 7 - 4 - 3 - 6",
  "6 - 2 - 5 - 2 - 3 - 4","7 - 5 - 7 - 6 - 8 - 6 - 2","4 - 8 - 2 - 5 - 4 - 3 - 5",
  "5 - 8 - 7 - 2 - 7 - 5 - 4 - 5","9 - 4 - 9 - 7 - 3 - 0 - 8 - 4",
  "5 - 0 - 1 - 1 - 3 - 2 - 1 - 0 - 5","2 - 7 - 1 - 4 - 8 - 4 - 2 - 9 - 6"];
  respuestasRDS: String[] = ["1 - 2","2 - 4","1 - 3 - 6","0 - 4 - 9","2 - 7 - 8 - 9",
  "1 - 4 - 7 - 8","1 - 2 - 6 - 7 - 9","3 - 3 - 5 - 8 - 8","1 - 2 - 3 - 4 - 6 - 7",
  "2 - 2 - 3 - 4 - 5 - 6","2 - 5 - 6 - 6 - 7 - 7 - 8","2 - 3 - 4 - 4 - 5 - 5 - 8",
  "2 - 4 - 5 - 5 - 5 - 7 - 7 - 8","0 - 3 - 4 - 4 - 7 - 8 - 9 - 9",
  "0 - 0 - 1 - 1 - 1 - 2 - 3 - 5 - 5","1 - 2 - 2 - 4 - 4 - 6 - 7 - 8 - 9"]
  puntuacionRDD: number = 0;
  puntuacionRDI: number = 0;
  puntuacionRDS: number = 0;
  puntuacion: number = 0;
  reactivosRDD: Reactivo[] = [];
  reactivosRDI: Reactivo[] = [];
  reactivosRDS: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean;
  constructor() { }

  ngOnInit() {
    this.construirRespuestasRDI();
    this.selectedRetencionDeDigitos = 1;
  }

  construirRespuestasRDI(){
    var i = 0;
    for (let ensayo of this.digitosRDI){
      this.respuestasRDI[i] = this.digitosRDI[i].split('').reverse().join('');
      i++;
    }
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo, numeroRD: number){
    this.reactivoActual = new Reactivo();
    this.reactivoActual.puntuacion=puntuacionReactivo;
    if(numeroRD == 1){
      this.reactivosRDD[numeroReactivo] = (this.reactivoActual);
      this.obtenerResultadoRDD(this.reactivosRDD);
    }
    else if(numeroRD == 2){
      this.reactivosRDI[numeroReactivo] = (this.reactivoActual);
      this.obtenerResultadoRDI(this.reactivosRDI);
    }
    else if(numeroRD == 3){
      this.reactivosRDS[numeroReactivo] = (this.reactivoActual);
      this.obtenerResultadoRDS(this.reactivosRDS);
    }

    //this.subprueba.reactivos=this.reactivosCalificados;
    //this.subprueba.numeroSubprueba = 2;
    /*if(this.reactivosCalificados[numeroReactivo].puntuacion == 0
      && this.reactivosCalificados[numeroReactivo-1].puntuacion == 0
      && this.reactivosCalificados[numeroReactivo-2].puntuacion == 0){
        this.hayDiscontinuacion = true;
      }*/
    //this.calificarSubprueba(this.subprueba);
  }

  obtenerResultadoRDD(reactivos: Reactivo[]){
    for (let reactivo of reactivos) {
      this.puntuacion = this.puntuacion + reactivo.puntuacion;
    } 
    this.puntuacionRDD = this.puntuacion;
    this.puntuacion = 0;
  }

  obtenerResultadoRDI(reactivos: Reactivo[]){
    for (let reactivo of reactivos) {
      this.puntuacion = this.puntuacion + reactivo.puntuacion;
    } 
    this.puntuacionRDI = this.puntuacion;
    this.puntuacion = 0;
  }

  obtenerResultadoRDS(reactivos: Reactivo[]){
    for (let reactivo of reactivos) {
      this.puntuacion = this.puntuacion + reactivo.puntuacion;
    } 
    this.puntuacionRDS = this.puntuacion;
    this.puntuacion = 0;
  }

  obtenerPuntuacionTotal(){
    this.puntuacion = this.puntuacionRDD + this.puntuacionRDI + this.puntuacionRDS;
    this.selectedRetencionDeDigitos = 4;
  }

  /*calificarSubprueba(subprueba: Subprueba){
    for (let reactivo of subprueba.reactivos) {
      this.puntuacionRDD = this.puntuacionRDD + reactivo.puntuacion;
    } 
    //this.subprueba.puntuacionNatural=this.puntuacionRDD;
    //this.puntuacion = 0; 
  }*/

}
