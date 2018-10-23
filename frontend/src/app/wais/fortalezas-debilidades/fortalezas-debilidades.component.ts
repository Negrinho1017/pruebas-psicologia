import { Component, OnInit } from '@angular/core';
import { Subprueba } from 'src/app/model/Subprueba';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-fortalezas-debilidades',
  templateUrl: './fortalezas-debilidades.component.html',
  styleUrls: ['./fortalezas-debilidades.component.css']
})
export class FortalezasDebilidadesComponent implements OnInit {
  subpruebas: String[] = [];
  selectedMedia: number = 1;
  puntuacionesEscalares: number[] = [];
  diferenciasDeLaMedia: number[] = [0,0,0,0,0,0,0,0,0,0];
  puntuacionEscalarMediaCV: number;
  puntuacionEscalarMediaRP: number;
  puntuacionEscalarMediaTotal: number;
  listaSubpruebas: Subprueba[];
  constructor( private globals: Globals, private router: Router,
     private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.calcularPuntuacionEscalarMedia();
    this.calcularDiferencias();
    this.puntuacionEscalarService.obtenerSubpruebasPorIdEvaluado(this.globals.idEvaluado).subscribe(res => {
      this.listaSubpruebas = res;
      this.subpruebas = [this.listaSubpruebas[3].nombre, this.listaSubpruebas[0].nombre,
      this.listaSubpruebas[6].nombre, this.listaSubpruebas[4].nombre ,this.listaSubpruebas[1].nombre,
      this.listaSubpruebas[7].nombre, this.listaSubpruebas[8].nombre, this.listaSubpruebas[5].nombre,
      this.listaSubpruebas[2].nombre, this.listaSubpruebas[9].nombre]
      this.puntuacionesEscalares = [this.listaSubpruebas[3].puntuacionEscalar, this.listaSubpruebas[0].puntuacionEscalar,
      this.listaSubpruebas[6].puntuacionEscalar, this.listaSubpruebas[4].puntuacionEscalar ,this.listaSubpruebas[1].puntuacionEscalar,
      this.listaSubpruebas[7].puntuacionEscalar, this.listaSubpruebas[8].puntuacionEscalar, this.listaSubpruebas[5].puntuacionEscalar,
      this.listaSubpruebas[2].puntuacionEscalar, this.listaSubpruebas[9].puntuacionEscalar]
      this.calcularPuntuacionEscalarMedia();
      this.calcularDiferencias();
    }); 
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
