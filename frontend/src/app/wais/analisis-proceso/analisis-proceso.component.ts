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
  puntuacionesProceso: String[];
  comparaciones: String[];
  p1: String[] = ["DC","RDD","RDD","RDI"];
  p2: String[] = ["DCS","RDI","RDS","RDS"];
  subpruebas: Subprueba[] = [];
  puntuacionesNaturales1: number[] = [0,0,0,0];
  puntuacionesNaturales2: number[] = [0,0,0,0];
  diferencias: number[] = [];
  valoresCriticos: number[] = [3.13, 3.23, 2.83, 2.78];
  diferenciasSignificativos: String[] = [];
  loading: boolean;
  constructor(private analisisProcesoService: AnalisisProcesoService,
    private router: Router, private globals: Globals,
    private fortalezasDebilidadesService: FortalezasDebilidadesService) { }

  ngOnInit() {
    this.loading=true;
    this.analisisProcesoService.obtenerSubpruebasAnalisisProceso(this.globals.idEvaluado)
      .subscribe(res => {
        this.subpruebas[0] = res.dcsbt;
        this.subpruebas[1] = res.rdd;
        this.subpruebas[2] = res.rdi;
        this.subpruebas[3] = res.rds;
        this.subpruebas[4] = res.dc;
        this.puntuacionesNaturales2[0] = this.subpruebas[0].puntuacionNatural;
        this.puntuacionesNaturales1[1] = this.subpruebas[1].puntuacionNatural;
        this.puntuacionesNaturales1[2] = this.subpruebas[1].puntuacionNatural;
        this.puntuacionesNaturales1[3] = this.subpruebas[2].puntuacionNatural;
        this.puntuacionesNaturales2[1] = this.subpruebas[2].puntuacionNatural;
        this.puntuacionesNaturales2[2] = this.subpruebas[3].puntuacionNatural;
        this.puntuacionesNaturales2[3] = this.subpruebas[3].puntuacionNatural;
        this.puntuacionesNaturales1[0] = this.subpruebas[4].puntuacionNatural;  
        this.calcularDiferencias();
        this.comparaciones = ["Diseño de cubos - Diseño de cubos sin bonificación por tiempo",
        "Retención de dígitos en orden directo - Retención de dígitos en orden inverso",
        "Retención de dígitos en orden directo - Retención de dígitos en secuencia",
        "Retención de dígitos en orden inverso - Retención de dígitos en secuencia"];
        this.puntuacionesProceso = ["Diseño de cubos sin bonificación por tiempo",
        "Retención de dígitos en orden directo","Retención de dígitos en orden inverso",
        "Retención de dígitos en secuencia"];
        this.loading=false;  
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

}
