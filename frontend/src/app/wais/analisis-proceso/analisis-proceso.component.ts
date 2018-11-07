import { Component, OnInit } from '@angular/core';
import { AnalisisProcesoService } from './analisis-proceso.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { Subprueba } from 'src/app/model/Subprueba';

@Component({
  selector: 'app-analisis-proceso',
  templateUrl: './analisis-proceso.component.html',
  styleUrls: ['./analisis-proceso.component.css']
})
export class AnalisisProcesoComponent implements OnInit {
  puntuacionesProceso: String[] = ["Diseño de cubos sin bonificación por tiempo",
  "Retención de dígitos en orden directo","Retención de dígitos en orden inverso",
  "Retención de dígitos en secuencia"];
  subpruebas: Subprueba[] = [];
  constructor(private analisisProcesoService: AnalisisProcesoService,
    private router: Router, private globals: Globals) { }

  ngOnInit() {
    this.analisisProcesoService.obtenerDisenoCubosSinBonificacionPorTiempo(this.globals.idEvaluado)
      .subscribe(res => {
        this.subpruebas[0] = res;
      });
    this.analisisProcesoService.obtenerRetencionDeDigitos(this.globals.idEvaluado,1)
      .subscribe(res => {
        this.subpruebas[1] = res;
      });
    this.analisisProcesoService.obtenerRetencionDeDigitos(this.globals.idEvaluado,2)
      .subscribe(res => {
        this.subpruebas[2] = res;
      });
    this.analisisProcesoService.obtenerRetencionDeDigitos(this.globals.idEvaluado,3)
      .subscribe(res => {
        this.subpruebas[3] = res;
      });

  }

}
