import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HojaDeResultadosService } from './hoja-de-resultados.service';
import { Prueba } from '../model/Prueba';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-hoja-de-resultados',
  templateUrl: './hoja-de-resultados.component.html',
  styleUrls: ['./hoja-de-resultados.component.css']
})
export class HojaDeResultadosComponent implements OnInit {
  subpruebas: String[] = ["Diseño con cubos", "Semejanzas", "Retención de dígitos", "Matrices",
    "Vocabulario", "Aritmética", "Búsqueda de símbolos", "Rompecabezas visual", "Información",
    "Claves"];
  prueba: Prueba;
  puntuacionesEscalares: number[] = [];

  puntajeSemejanzas: number;
  puntajeRetencionDigitos: number;
  puntajeMatrices: number;
  puntajeVocabulario: number;
  puntajeAritmetica: number;
  puntajeBusquedaSimbolos: number;
  puntajeRompecabezasVisual: number;
  puntajeInformacion: number;
  puntajeClaves: number;
  puntuacionesNaturales: number[] = [];
  puntuacionesComprensionVerbal: number[];
  puntuacionesRazonamientoPerceptual: number[];
  puntuacionesMemoriaDeTrabajo: number[];
  puntuacionesVelocidadDeProcesamiento: number[];

  graficaComprensionVerbal: Chart;
  graficaRazonamientoPerceptual: Chart;
  graficaMemoriaDeTrabajo: Chart;
  graficaVelocidadProcesamiento: Chart;

  comprensionVerbal: number;
  razonamientoPerceptual: number;
  memoriaDeTrabajo: number;
  velocidadDeProcesamiento: number;
  CITotal: number;
  constructor( private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private globals: Globals) { 
    }

  ngOnInit() {
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(this.globals.idEvaluado)
    .subscribe(res => {
      this.prueba = res;
      this.puntuacionesComprensionVerbal = [this.prueba.ramaDelConocimiento[0].subpruebas[0].puntuacionEscalar,
      this.prueba.ramaDelConocimiento[0].subpruebas[1].puntuacionEscalar,
      this.prueba.ramaDelConocimiento[0].subpruebas[2].puntuacionEscalar]
      this.puntuacionesRazonamientoPerceptual = [this.prueba.ramaDelConocimiento[1].subpruebas[0].puntuacionEscalar,
      this.prueba.ramaDelConocimiento[1].subpruebas[1].puntuacionEscalar,
      this.prueba.ramaDelConocimiento[1].subpruebas[2].puntuacionEscalar];
      this.puntuacionesMemoriaDeTrabajo = [this.prueba.ramaDelConocimiento[2].subpruebas[0].puntuacionEscalar,
      this.prueba.ramaDelConocimiento[2].subpruebas[1].puntuacionEscalar];
      this.puntuacionesVelocidadDeProcesamiento = [this.prueba.ramaDelConocimiento[3].subpruebas[0].puntuacionEscalar,
      this.prueba.ramaDelConocimiento[3].subpruebas[1].puntuacionEscalar]    
      this.puntuacionesEscalares = [this.puntuacionesRazonamientoPerceptual[0],
      this.puntuacionesComprensionVerbal[0], this.puntuacionesMemoriaDeTrabajo[0],
      this.puntuacionesRazonamientoPerceptual[1], this.puntuacionesComprensionVerbal[1],
      this.puntuacionesMemoriaDeTrabajo[1], this.puntuacionesVelocidadDeProcesamiento[0],
      this.puntuacionesRazonamientoPerceptual[2], this.puntuacionesComprensionVerbal[2],
      this.puntuacionesVelocidadDeProcesamiento[1]];

      this.puntuacionesNaturales = [this.prueba.ramaDelConocimiento[1].subpruebas[0].puntuacionNatural,
      this.prueba.ramaDelConocimiento[0].subpruebas[0].puntuacionNatural,
      this.prueba.ramaDelConocimiento[2].subpruebas[0].puntuacionNatural,
      this.prueba.ramaDelConocimiento[1].subpruebas[1].puntuacionNatural,
      this.prueba.ramaDelConocimiento[0].subpruebas[1].puntuacionNatural,
      this.prueba.ramaDelConocimiento[2].subpruebas[1].puntuacionNatural,
      this.prueba.ramaDelConocimiento[3].subpruebas[0].puntuacionNatural,
      this.prueba.ramaDelConocimiento[1].subpruebas[2].puntuacionNatural,
      this.prueba.ramaDelConocimiento[0].subpruebas[2].puntuacionNatural,
      this.prueba.ramaDelConocimiento[3].subpruebas[1].puntuacionNatural];

      this.comprensionVerbal = this.prueba.ramaDelConocimiento[0].puntuacionTotal;
      this.razonamientoPerceptual = this.prueba.ramaDelConocimiento[1].puntuacionTotal;
      this.memoriaDeTrabajo = this.prueba.ramaDelConocimiento[2].puntuacionTotal;
      this.velocidadDeProcesamiento = this.prueba.ramaDelConocimiento[3].puntuacionTotal;
      this.CITotal = this.comprensionVerbal + this.razonamientoPerceptual + this.memoriaDeTrabajo
      + this.velocidadDeProcesamiento;

      this.graficar();
    });
  }

  graficar(){
    this.graficaComprensionVerbal = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Comprensión verbal'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          color: 'black',
          name: "Comprensión verbal",
          data: [{
            name: 'Semejanzas',
            y: this.puntuacionesEscalares[1]
          },
          {
            name: 'Vocabulario',
            y: this.puntuacionesEscalares[4]
          },
          {
            name: 'Información',
            y: this.puntuacionesEscalares[8]
          }]
        }
      ]
    });
  
    this.graficaRazonamientoPerceptual = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Razonamiento perceptual'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          color: 'black',
          name: "Razonamiento perceptual",
          data: [{
            name: 'Diseño de cubos',
            y: this.puntuacionesEscalares[0]
          },
          {
            name: 'Matrices',
            y: this.puntuacionesEscalares[3]
          },
          {
            name: 'Rompecabezas visual',
            y: this.puntuacionesEscalares[7]
          }]
        }
      ]
    });
  
    this.graficaMemoriaDeTrabajo = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Memoria de trabajo'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          color: 'black',
          name: "Memoria de trabajo",
          data: [{
            name: 'Retención de dígitos',
            y: this.puntuacionesEscalares[2]
          },
          {
            name: 'Aritmética',
            y: this.puntuacionesEscalares[5],
          }],
        }
      ]
    });
  
    this.graficaVelocidadProcesamiento = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Velocidad de procesamiento'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          color: 'black',
          name: "Velocidad de procesamiento",
          data: [{
            name: 'Búsqueda de símbolos',
            y: this.puntuacionesEscalares[6]
          },
          {
            name: 'Claves',
            y: this.puntuacionesEscalares[9]
          }]
        }
      ]
    });
  }
}
