import { Component, OnInit } from '@angular/core';
import { Subprueba } from 'src/app/model/Subprueba';
import { AnalisisProcesoService } from 'src/app/wais/analisis-proceso/analisis-proceso.service';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { FortalezasDebilidadesService } from 'src/app/wais/fortalezas-debilidades/fortalezas-debilidades.service';
import { AnalisisService } from 'src/app/wais/analisis/analisis.service';

@Component({
  selector: 'app-analisis-proceso-wisc',
  templateUrl: './analisis-proceso-wisc.component.html',
  styleUrls: ['./analisis-proceso-wisc.component.css']
})
export class AnalisisProcesoWiscComponent implements OnInit {
  puntuacionesProceso: String[];
  comparaciones: String[];
  p1: String[] = ["DC","RDD","RA"];
  p2: String[] = ["DCS","RDI","RE"];
  subpruebas: Subprueba[] = [];
  puntuacionesNaturales1: number[] = [];
  puntuacionesNaturales2: number[] = [];
  diferencias: number[] = [];
  valoresCriticos: number[] = [3.26, 3.62, 4.4];
  diferenciasSignificativos: String[] = [];
  loading: boolean;
  sonLas10SubpruebasPrincipales: boolean = false;
  constructor(private analisisProcesoService: AnalisisProcesoService,
    private router: Router, private globals: Globals,
    private fortalezasDebilidadesService: FortalezasDebilidadesService, private analisisService: AnalisisService) { }

  ngOnInit() {
    this.loading=true;
    this.analisisProcesoService.obtenerSubpruebasAnalisisProceso(this.globals.idEvaluado)
      .subscribe(res => {
        this.subpruebas[0] = res.dcsbt;
        this.subpruebas[1] = res.rdd;
        this.subpruebas[2] = res.rdi;
        this.subpruebas[3] = res.registrosAleatorio;
        this.subpruebas[4] = res.registrosEstructurado;
        this.subpruebas[5] = res.dc;
        this.puntuacionesNaturales2[0] = this.subpruebas[0].puntuacionNatural;
        this.puntuacionesNaturales1[0] = this.subpruebas[5].puntuacionNatural;
        this.puntuacionesNaturales1[1] = this.subpruebas[1].puntuacionNatural;
        this.puntuacionesNaturales2[1] = this.subpruebas[2].puntuacionNatural;
        if(this.subpruebas[3] != null && this.subpruebas[3] != null){
          this.puntuacionesNaturales1[2] = this.subpruebas[3].puntuacionNatural;
          this.puntuacionesNaturales2[2] = this.subpruebas[4].puntuacionNatural;
        }else{
          this.puntuacionesNaturales1[2] = -1;
          this.puntuacionesNaturales2[2] = -1;
        }  
        this.calcularDiferencias();
        this.comparaciones = ["Diseño de cubos - Diseño de cubos sin bonificación por tiempo",
        "Retención de dígitos en orden directo - Retención de dígitos en orden inverso",
        "Registros aleatorio - Registros estructurado"];
        this.puntuacionesProceso = ["Diseño de cubos sin bonificación por tiempo",
        "Retención de dígitos en orden directo","Retención de dígitos en orden inverso","Registros aleatorio",
        "Registros estructurado"];
        this.loading=false;  
      });
  }

  calcularDiferencias(){
    var i = 0;
    for(let p1 of this.puntuacionesNaturales1){
      this.diferencias[i] = p1 - this.puntuacionesNaturales2[i];
      if(Math.abs(this.diferencias[i])>this.valoresCriticos[i]){
        this.diferenciasSignificativos[i] = 'S';
      }else{
        this.diferenciasSignificativos[i] = 'N';
      }
      i++;
    }
  }

  anterior(){
    this.analisisService.sonLas10SubpruebasPrincipales(this.globals.idEvaluado)
    .subscribe(res => {
      this.sonLas10SubpruebasPrincipales = res;
      if(this.sonLas10SubpruebasPrincipales){
        this.router.navigate(['/fortalezas-debilidades']);
      }else{
        this.router.navigate(['/analisis-wisc']);
      }
    });
  }
}
