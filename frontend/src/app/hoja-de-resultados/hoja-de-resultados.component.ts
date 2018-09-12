import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-hoja-de-resultados',
  templateUrl: './hoja-de-resultados.component.html',
  styleUrls: ['./hoja-de-resultados.component.css']
})
export class HojaDeResultadosComponent implements OnInit {
  subpruebas: String[] = ["Diseño con cubos", "Semejanzas", "Retención de dígitos", "Matrices",
    "Vocabulario", "Aritmética", "Búsqueda de símbolos", "Rompecabezas visual", "Información",
    "Claves"]
  puntuacionesNaturales: number[] = [5, 4, 6, 7, 12, 15, 7, 8, 9, 11];
  constructor() { }

  ngOnInit() {
  }

  chart = new Chart({
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
        name: "Comprensión verbal",
        data: [{
          name: 'SE',
          y: this.puntuacionesNaturales[1]
        },
        {
          name: 'VB',
          y: this.puntuacionesNaturales[4]
        },
        {
          name: 'IN',
          y: this.puntuacionesNaturales[8]
        }]
      }
    ]
  });

}
