import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fortalezas-debilidades',
  templateUrl: './fortalezas-debilidades.component.html',
  styleUrls: ['./fortalezas-debilidades.component.css']
})
export class FortalezasDebilidadesComponent implements OnInit {
  subpruebas: String[] = ["Diseño de cubos","Semejanzas","Retención de dígitos","Matrices","Vocabulario",
  "Aritmética","Búsqueda de símbolos","Rompecabezas visual","Información","Claves"];
  selectedMedia: number = 1;
  puntuacionesEscalares: number[] = [9,9,10,5,7,12,7,4,8,9];
  diferenciasDeLaMedia: number[] = [0,0,0,0,0,0,0,0,0,0];
  puntuacionEscalarMediaCV: number;
  puntuacionEscalarMediaRP: number;
  puntuacionEscalarMediaTotal: number;
  constructor() { }

  ngOnInit() {
    this.calcularPuntuacionEscalarMedia();
    this.calcularDiferencias();
  }

  calcularDiferencias(){
    if(this.selectedMedia == 1){
      this.calcularConMediaTotal();
    }else{
      this.calcularConDiferenciasDeLaMedia();
    }
  }
  calcularPuntuacionEscalarMedia(){
    this.puntuacionEscalarMediaCV = (this.puntuacionesEscalares[1]+this.puntuacionesEscalares[4]+this.puntuacionesEscalares[8])/3;
    this.puntuacionEscalarMediaRP = (this.puntuacionesEscalares[0]+this.puntuacionesEscalares[3]+this.puntuacionesEscalares[7])/3;
  }

  calcularPuntuacionEscalarMediaTotal(){
    var contador = 0;
    for(let calificacionSubprueba of this.puntuacionesEscalares){
      contador += calificacionSubprueba;
    }
    this.puntuacionEscalarMediaTotal = contador/10;
  }

  calcularConMediaTotal(){
    this.calcularPuntuacionEscalarMediaTotal();
    var i = 0;
    for (let calificacionSubprueba of this.puntuacionesEscalares) {
      this.diferenciasDeLaMedia[i] = calificacionSubprueba - this.puntuacionEscalarMediaTotal;
      i++;
    }
  }

  calcularConDiferenciasDeLaMedia(){
    var i = 0;
    for (let calificacionSubprueba of this.puntuacionesEscalares) {
      if(i==1 || i==4 || i==8){
        this.diferenciasDeLaMedia[i] = calificacionSubprueba - this.puntuacionEscalarMediaCV;
      }
      else if(i==0 || i==3 || i==7){
        this.diferenciasDeLaMedia[i] = calificacionSubprueba - this.puntuacionEscalarMediaRP;
      }else{
        this.diferenciasDeLaMedia[i] = null;
      }
      i++;
    }
  }

}
