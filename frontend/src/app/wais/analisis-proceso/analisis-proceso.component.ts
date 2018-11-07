import { Component, OnInit } from '@angular/core';
import { AnalisisProcesoService } from './analisis-proceso.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { Subprueba } from 'src/app/model/Subprueba';
import { FortalezasDebilidadesService } from '../fortalezas-debilidades/fortalezas-debilidades.service';

@Component({
  selector: 'app-analisis-proceso',
  templateUrl: './analisis-proceso.component.html',
  styleUrls: ['./analisis-proceso.component.css']
})
export class AnalisisProcesoComponent implements OnInit {
  puntuacionesProceso: String[] = ["Diseño de cubos sin bonificación por tiempo",
  "Retención de dígitos en orden directo","Retención de dígitos en orden inverso",
  "Retención de dígitos en secuencia"];
  comparaciones: String[] = ["Diseño de cubos - Diseño de cubos sin bonificación por tiempo",
  "Retención de dígitos en orden directo - Retención de dígitos en orden inverso",
  "Retención de dígitos en orden directo - Retención de dígitos en secuencia",
  "Retención de dígitos en orden inverso - Retención de dígitos en secuencia"];
  p1: String[] = ["DC","RDD","RDD","RDI"];
  p2: String[] = ["DCS","RDI","RDS","RDS"];
  subpruebas: Subprueba[] = [];
  puntuacionesNaturales1: number[] = [0,0,0,0];
  puntuacionesNaturales2: number[] = [0,0,0,0];
  diferencias: number[] = [];
  valoresCriticos: number[] = [3.22, 3.8, 3.69, 3.88];
  diferenciasSignificativos: String[] = [];
  constructor(private analisisProcesoService: AnalisisProcesoService,
    private router: Router, private globals: Globals,
    private fortalezasDebilidadesService: FortalezasDebilidadesService) { }

  ngOnInit() {
    this.analisisProcesoService.obtenerDisenoCubosSinBonificacionPorTiempo(this.globals.idEvaluado)
      .subscribe(res => {
        this.subpruebas[0] = res;
        this.puntuacionesNaturales2[0] = this.subpruebas[0].puntuacionNatural;
        this.rdd();     
      });
  }

  calcularDiferencias(){
    var i = 0;
    for(let p1 of this.puntuacionesNaturales1){
      this.diferencias[i] = p1 - this.puntuacionesNaturales2[i];
      if(this.diferencias[i]>this.valoresCriticos[i]){
        this.diferenciasSignificativos[i] = 'S';
      }else{
        this.diferenciasSignificativos[i] = 'N';
      }
      i++;
    }
  }

  rdd(){
    this.analisisProcesoService.obtenerRetencionDeDigitos(this.globals.idEvaluado,1)
      .subscribe(res => {
        this.subpruebas[1] = res;
        this.puntuacionesNaturales1[1] = this.subpruebas[1].puntuacionNatural;
        this.puntuacionesNaturales1[2] = this.subpruebas[1].puntuacionNatural;
        this.rdi();
      });
  }

  rdi(){
    this.analisisProcesoService.obtenerRetencionDeDigitos(this.globals.idEvaluado,2)
      .subscribe(res => {
        this.subpruebas[2] = res;
        this.puntuacionesNaturales1[3] = this.subpruebas[2].puntuacionNatural;
        this.puntuacionesNaturales2[1] = this.subpruebas[2].puntuacionNatural;
        this.rds();
      });
  }

  rds(){
    this.analisisProcesoService.obtenerRetencionDeDigitos(this.globals.idEvaluado,3)
      .subscribe(res => {
        this.subpruebas[3] = res;
        this.puntuacionesNaturales2[2] = this.subpruebas[3].puntuacionNatural;
        this.puntuacionesNaturales2[3] = this.subpruebas[3].puntuacionNatural;
        this.dc();
      });
  }

  dc(){
    this.fortalezasDebilidadesService.obtenerSubpruebasPorIdEvaluado(this.globals.idEvaluado)
    .subscribe(res => {
      this.puntuacionesNaturales1[0] = res[3].puntuacionNatural;
      this.calcularDiferencias();
    });
  }

}
