import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { HojaDePuntuacionesCompuestasService } from './hoja-de-puntuaciones-compuestas.service';
import { Chart } from 'angular-highcharts';
import { PuntuacionCompuesta } from '../model/PuntuacionCompuesta';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Prueba } from '../model/Prueba';

@Component({
  selector: 'app-hoja-de-puntuaciones-compuestas',
  templateUrl: './hoja-de-puntuaciones-compuestas.component.html',
  styleUrls: ['./hoja-de-puntuaciones-compuestas.component.css']
})
export class HojaDePuntuacionesCompuestasComponent implements OnInit {
  ramasDelConocimiento: String[] = ["Comprensión verbal", "Razonamiento perceptual", "Memoria de trabajo",
    "Velocidad de procesamiento", "CI Total"];
  puntuacionesEscalares: number[] = [24, 18, 22, 16, 80];
  indices: String[] = ["ICV", "IRP", "IMT", "IVP", "CIT"];
  grafica: Chart;
  prueba: Prueba = new Prueba();
  puntuacionesCompuestas: PuntuacionCompuesta[] = [];

  puntuacionCompuestaICV: PuntuacionCompuesta = new PuntuacionCompuesta();
  puntuacionCompuestaIRP: PuntuacionCompuesta = new PuntuacionCompuesta();
  puntuacionCompuestaIMT: PuntuacionCompuesta = new PuntuacionCompuesta();
  puntuacionCompuestaIVP: PuntuacionCompuesta = new PuntuacionCompuesta();
  puntuacionCompuestaCIT: PuntuacionCompuesta = new PuntuacionCompuesta();
  constructor(private router: Router, private globals: Globals,
    private hojaDePuntuacionesCompuestasService: HojaDePuntuacionesCompuestasService,
    private hojaDeResultadosService: HojaDeResultadosService ) { }

  ngOnInit() {
    this.globals.puntuacionesCompuestas = [];
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(this.globals.idEvaluado)
    .subscribe(res => {
      this.prueba = res;
      this.obtenerPuntuacionCompuestaICV(this.prueba.ramaDelConocimiento[0].puntuacionTotal);
      this.obtenerPuntuacionCompuestaIRP(this.prueba.ramaDelConocimiento[1].puntuacionTotal);
      this.obtenerPuntuacionCompuestaIMT(this.prueba.ramaDelConocimiento[2].puntuacionTotal);
      this.obtenerPuntuacionCompuestaIVP(this.prueba.ramaDelConocimiento[3].puntuacionTotal);
      this.obtenerPuntuacionCompuestaCIT(this.globals.CITotal);
    });
  }

  obtenerPuntuacionCompuestaICV(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("ICV", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaICV = res;
        this.puntuacionesCompuestas[0] = this.puntuacionCompuestaICV;
        this.globals.puntuacionesCompuestas[0] = this.puntuacionCompuestaICV.puntuacion;
      });
  }

  obtenerPuntuacionCompuestaIRP(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("IRP", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaIRP = res;
        this.puntuacionesCompuestas[1] = this.puntuacionCompuestaIRP;
        this.globals.puntuacionesCompuestas[1] = this.puntuacionCompuestaIRP.puntuacion;
      });
  }

  obtenerPuntuacionCompuestaIMT(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("IMT", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaIMT = res;
        this.puntuacionesCompuestas[2] = this.puntuacionCompuestaIMT;
        this.globals.puntuacionesCompuestas[2] = this.puntuacionCompuestaIMT.puntuacion;
      });
  }

  obtenerPuntuacionCompuestaIVP(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("IVP", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaIVP = res;
        this.puntuacionesCompuestas[3] = this.puntuacionCompuestaIVP;
        this.globals.puntuacionesCompuestas[3] = this.puntuacionCompuestaIVP.puntuacion;
      });
  }

  obtenerPuntuacionCompuestaCIT(puntuacionTotal: number) {
    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta("CIT", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaCIT = res;
        this.puntuacionesCompuestas[4] = this.puntuacionCompuestaCIT;
        this.globals.puntuacionesCompuestas[4] = this.puntuacionCompuestaCIT.puntuacion;
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
          name: "Puntuación compuesta",
          data: [{
            name: 'Comprensión verbal',
            y: this.globals.puntuacionesCompuestas[0]
          },
          {
            name: 'Razonamiento perceptual',
            y: this.globals.puntuacionesCompuestas[1]
          },
          {
            name: 'Memoria de trabajo',
            y: this.globals.puntuacionesCompuestas[2]
          },
          {
            name: 'Velocidad de procesamiento',
            y: this.globals.puntuacionesCompuestas[3]
          },
          {
            name: 'CI Total',
            y: this.globals.puntuacionesCompuestas[4]
          }]
        }
      ]
    });
  }
}
