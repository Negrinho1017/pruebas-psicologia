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

  puntuacionCompuestaICV: PuntuacionCompuesta = new PuntuacionCompuesta();
  puntuacionCompuestaIRP: PuntuacionCompuesta = new PuntuacionCompuesta();
  puntuacionCompuestaIMT: PuntuacionCompuesta = new PuntuacionCompuesta();
  puntuacionCompuestaIVP: PuntuacionCompuesta = new PuntuacionCompuesta();
  puntuacionCompuestaCIT: PuntuacionCompuesta = new PuntuacionCompuesta();
  constructor(private router: Router, private globals: Globals,
    private hojaDePuntuacionesCompuestasService: HojaDePuntuacionesCompuestasService) { }

  ngOnInit() {
    var i = 0;
    this.obtenerPuntuacionCompuestaICV(this.puntuacionesEscalares[0]);
    this.obtenerPuntuacionCompuestaIRP(this.puntuacionesEscalares[1]);
    this.obtenerPuntuacionCompuestaIMT(this.puntuacionesEscalares[2]);
    this.obtenerPuntuacionCompuestaIVP(this.puntuacionesEscalares[3]);
    this.obtenerPuntuacionCompuestaCIT(this.puntuacionesEscalares[4]);
    //this.puntuacionesEscalares[4] = this.globals.CITotal;
  }

  obtenerPuntuacionCompuestaICV(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("ICV", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaICV = res;
        this.puntuacionesCompuestas[0] = this.puntuacionCompuestaICV;
      });
  }

  obtenerPuntuacionCompuestaIRP(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("IRP", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaIVP = res;
        this.puntuacionesCompuestas[1] = this.puntuacionCompuestaIVP;
      });
  }

  obtenerPuntuacionCompuestaIMT(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("IMT", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaIMT = res;
        this.puntuacionesCompuestas[2] = this.puntuacionCompuestaIMT;
      });
  }

  obtenerPuntuacionCompuestaIVP(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("IVP", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaIVP = res;
        this.puntuacionesCompuestas[3] = this.puntuacionCompuestaIVP;
      });
  }

  obtenerPuntuacionCompuestaCIT(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("ICV", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaCIT = res;
        this.puntuacionesCompuestas[4] = this.puntuacionCompuestaCIT;
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
