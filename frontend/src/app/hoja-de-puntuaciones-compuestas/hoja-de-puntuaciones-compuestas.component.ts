import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { HojaDePuntuacionesCompuestasService } from './hoja-de-puntuaciones-compuestas.service';
import { Chart } from 'angular-highcharts';
import { PuntuacionCompuesta } from '../model/PuntuacionCompuesta';

@Component({
  selector: 'app-hoja-de-puntuaciones-compuestas',
  templateUrl: './hoja-de-puntuaciones-compuestas.component.html',
  styleUrls: ['./hoja-de-puntuaciones-compuestas.component.css']
})
export class HojaDePuntuacionesCompuestasComponent implements OnInit {
  ramasDelConocimiento: String[] = ["Comprensión verbal", "Razonamiento perceptual", "Memoria de trabajo",
    "Velocidad de procesamiento", "CI Total"];
  puntuacionesEscalares: number[] = [24, 18, 22, 16, 20];
  indices: String[] = ["ICV", "IRP", "IMT", "IVP", "CIT"];
  grafica: Chart;
  puntuacionesCompuestas: PuntuacionCompuesta[] = [];
  constructor(private router: Router, private globals: Globals,
    private hojaDePuntuacionesCompuestasService: HojaDePuntuacionesCompuestasService) { }

  ngOnInit() {
    var i = 0;
    //this.puntuacionesEscalares[4] = this.globals.CITotal;
    for (let puntuacion of this.puntuacionesEscalares) {
      this.obtenerPuntuacionCompuesta("ICV", puntuacion,i);
      i++;
    }
  }

  obtenerPuntuacionCompuesta(idIndice: String, puntuacionTotal: number, posicion: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta(idIndice, puntuacionTotal)
      .subscribe(res => {
        this.puntuacionesCompuestas[posicion] = res;
        this.graficar();
      });
  }

  graficar() {
    this.grafica = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Perfil de puntuaciones compuestas'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          color: 'black',
          name: "Puntuaciones compuestas",
          data: [{
            name: 'Comprensión verbal',
            y: this.puntuacionesCompuestas[0].puntuacion
          },
          {
            name: 'Razonamiento perceptual',
            y: this.puntuacionesCompuestas[1].puntuacion
          },
          {
            name: 'Memoria de trabajo',
            y: this.puntuacionesCompuestas[2].puntuacion
          },
          {
            name: 'Velocidad de procesamiento',
            y: this.puntuacionesCompuestas[3].puntuacion
          },
          {
            name: 'CI Total',
            y: this.puntuacionesCompuestas[4].puntuacion
          }]
        }
      ]
    });
  }

}
