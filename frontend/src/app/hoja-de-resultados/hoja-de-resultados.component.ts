import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { HojaDeResultadosService } from './hoja-de-resultados.service';
import { EdadPersona } from '../model/EdadPersona';
import { Prueba } from '../model/Prueba';
import { Persona } from '../model/Persona';
import swal from 'sweetalert'
import { RamaDelConocimiento } from '../model/RamaDelConocimiento';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
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
  puntuacionesNaturales: number[] = [];

  puntajeSemejanzas: number;
  puntajeRetencionDigitos: number;
  puntajeMatrices: number;
  puntajeVocabulario: number;
  puntajeAritmetica: number;
  puntajeBusquedaSimbolos: number;

  puntuacionesComprensionVerbal: number[];
  puntuacionesRazonamientoPerceptual: number[];
  puntuacionesMemoriaDeTrabajo: number[];
  puntuacionesVelocidadDeProcesamiento: number[];

  graficaComprensionVerbal: Chart;
  graficaRazonamientoPerceptual: Chart;
  graficaMemoriaDeTrabajo: Chart;
  graficaVelocidadProcesamiento: Chart;
  constructor( private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private globals: Globals) { 
    }

  ngOnInit() {
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(this.globals.idEvaluado)
    .subscribe(res => {
      this.prueba = res;
      /*this.puntuacionesComprensionVerbal = [this.prueba.ramaDelConocimiento[0].subpruebas[0].puntuacionNatural,
      this.prueba.ramaDelConocimiento[0].subpruebas[1].puntuacionNatural,
      this.prueba.ramaDelConocimiento[0].subpruebas[2].puntuacionNatural]
      this.puntuacionesRazonamientoPerceptual = [this.prueba.ramaDelConocimiento[1].subpruebas[0].puntuacionNatural,
      this.prueba.ramaDelConocimiento[1].subpruebas[1].puntuacionNatural,
      this.prueba.ramaDelConocimiento[1].subpruebas[2].puntuacionNatural];
      this.puntuacionesMemoriaDeTrabajo = [this.prueba.ramaDelConocimiento[2].subpruebas[0].puntuacionNatural,
      this.prueba.ramaDelConocimiento[2].subpruebas[1].puntuacionNatural];
      this.puntuacionesVelocidadDeProcesamiento = [this.prueba.ramaDelConocimiento[3].subpruebas[0].puntuacionNatural,
      this.prueba.ramaDelConocimiento[3].subpruebas[1].puntuacionNatural]*/
      this.puntajeMatrices = this.prueba.ramaDelConocimiento[1].subpruebas[0].puntuacionNatural;
      this.puntajeSemejanzas = this.prueba.ramaDelConocimiento[0].subpruebas[0].puntuacionNatural;
      this.puntajeRetencionDigitos = this.prueba.ramaDelConocimiento[2].subpruebas[0].puntuacionNatural;
      this.puntajeVocabulario = this.prueba.ramaDelConocimiento[0].subpruebas[1].puntuacionNatural;
      this.puntajeAritmetica = this.prueba.ramaDelConocimiento[2].subpruebas[1].puntuacionNatural;
      this.puntajeBusquedaSimbolos = this.prueba.ramaDelConocimiento[3].subpruebas[0].puntuacionNatural;
      this.puntuacionesNaturales = [5, this.puntajeSemejanzas, this.puntajeRetencionDigitos,
         this.puntajeMatrices, this.puntajeVocabulario, this.puntajeAritmetica, this.puntajeBusquedaSimbolos,
          8, 9, 11];
      this.graficar();
      /*this.puntuacionesNaturales = [this.puntuacionesRazonamientoPerceptual[0],
      this.puntuacionesComprensionVerbal[0], this.puntuacionesMemoriaDeTrabajo[0],
      this.puntuacionesRazonamientoPerceptual[1], this.puntuacionesComprensionVerbal[1],
      this.puntuacionesMemoriaDeTrabajo[1], this.puntuacionesVelocidadDeProcesamiento[0],
      this.puntuacionesRazonamientoPerceptual[2], this.puntuacionesComprensionVerbal[2],
      this.puntuacionesMemoriaDeTrabajo[1]];*/
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
            y: this.puntuacionesNaturales[1]
          },
          {
            name: 'Vocabulario',
            y: this.puntuacionesNaturales[4]
          },
          {
            name: 'Información',
            y: this.puntuacionesNaturales[8]
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
            y: this.puntuacionesNaturales[0]
          },
          {
            name: 'Matrices',
            y: this.puntuacionesNaturales[3]
          },
          {
            name: 'Rompecabezas visual',
            y: this.puntuacionesNaturales[7]
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
            y: this.puntuacionesNaturales[2]
          },
          {
            name: 'Aritmética',
            y: this.puntuacionesNaturales[5],
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
            y: this.puntuacionesNaturales[6]
          },
          {
            name: 'Claves',
            y: this.puntuacionesNaturales[9]
          }]
        }
      ]
    });
  }
}
