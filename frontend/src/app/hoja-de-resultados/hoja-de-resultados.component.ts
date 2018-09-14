import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { HojaDeResultadosService } from './hoja-de-resultados.service';
import { EdadPersona } from '../model/EdadPersona';

@Component({
  selector: 'app-hoja-de-resultados',
  templateUrl: './hoja-de-resultados.component.html',
  styleUrls: ['./hoja-de-resultados.component.css']
})
export class HojaDeResultadosComponent implements OnInit {
  subpruebas: String[] = ["Diseño con cubos", "Semejanzas", "Retención de dígitos", "Matrices",
    "Vocabulario", "Aritmética", "Búsqueda de símbolos", "Rompecabezas visual", "Información",
    "Claves"];
  fechaNacimiento: String;
  fechaEvaluacion: String;
  edad: EdadPersona;
  fechas: boolean = false;
  nombreEvaluado: String;
  idEvaluado: String;
  nombreExaminador: String;
  puntuacionesNaturales: number[] = [5, 4, 6, 7, 12, 15, 7, 8, 9, 11];
  constructor( private hojaDeResultadosService: HojaDeResultadosService ) { }

  ngOnInit() {
  }

  graficaComprensionVerbal = new Chart({
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

  graficaRazonamientoPerceptual = new Chart({
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

  graficaMemoriaDeTrabajo = new Chart({
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

  graficaVelocidadProcesamiento = new Chart({
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

  calcularEdad(){
    const fechaNacimiento = new DatePipe('en-US').transform(this.fechaNacimiento, 'dd/MM/yyyy');
    const fechaEvaluacion = new DatePipe('en-US').transform(this.fechaEvaluacion, 'dd/MM/yyyy');
    this.hojaDeResultadosService.obtenerEdadEvaluado(fechaNacimiento,fechaEvaluacion).subscribe(res => {
      this.edad = res;
      this.fechas = true;
    });
  }

  validarFechas(){
    if(this.fechaNacimiento != undefined && this.fechaEvaluacion != undefined){
      this.calcularEdad();
    }
  }

}
