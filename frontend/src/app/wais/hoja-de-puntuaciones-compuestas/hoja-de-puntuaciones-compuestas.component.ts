import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import { HojaDePuntuacionesCompuestasService } from './hoja-de-puntuaciones-compuestas.service';
import { Chart } from 'angular-highcharts';
import { PuntuacionCompuesta } from '../../model/PuntuacionCompuesta';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { Prueba } from '../../model/Prueba';

@Component({
  selector: 'app-hoja-de-puntuaciones-compuestas',
  templateUrl: './hoja-de-puntuaciones-compuestas.component.html',
  styleUrls: ['./hoja-de-puntuaciones-compuestas.component.css']
})
export class HojaDePuntuacionesCompuestasComponent implements OnInit {
  ramasDelConocimiento: String[] = ["Comprensión verbal", "Razonamiento perceptual", "Memoria de trabajo",
    "Velocidad de procesamiento", "CI Total"];
  puntuacionesEscalares: number[] = [];
  indices: String[] = ["ICV", "IRP", "IMT", "IVP", "CIT"];
  grafica: Chart;
  prueba: Prueba = new Prueba();
  intervalosConfianza: String[] = [];
  percentiles: number[] = [];
  puntuacionesCompuestas: number[] = [];
  loading: boolean;
  puntuacionCompuestaCIT: PuntuacionCompuesta = new PuntuacionCompuesta();
  constructor(private router: Router, private globals: Globals,
    private hojaDePuntuacionesCompuestasService: HojaDePuntuacionesCompuestasService,
    private hojaDeResultadosService: HojaDeResultadosService ) { }

  ngOnInit() {
    this.loading = true
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(<string> this.globals.idEvaluado)
    .subscribe(res => {
      this.prueba = res;
      this.puntuacionesEscalares = [this.prueba.ramaDelConocimiento[0].puntuacionTotal,
      this.prueba.ramaDelConocimiento[1].puntuacionTotal,this.prueba.ramaDelConocimiento[2].puntuacionTotal,
      this.prueba.ramaDelConocimiento[3].puntuacionTotal, this.globals.CITotal];  
      var i = 0;
      for(let ramaDelConocimiento of this.prueba.ramaDelConocimiento){
        this.intervalosConfianza[i] = ramaDelConocimiento.intervaloConfianza;
        this.percentiles[i] = ramaDelConocimiento.rangoPercentil;
        this.puntuacionesCompuestas[i] = ramaDelConocimiento.puntuacionCompuesta;
        i++;
      }    
      this.globals.indices = this.puntuacionesCompuestas;
      this.obtenerPuntuacionCompuestaCIT(this.globals.CITotal);
      this.loading=false;
    });
  }

  obtenerPuntuacionCompuestaCIT(puntuacionTotal: number) {

    this.hojaDePuntuacionesCompuestasService.obtenerPuntuacionCompuesta(localStorage.getItem('tipoPrueba')=="WAIS" ? "CIT" : "CIT-WISC", puntuacionTotal)
      .subscribe(res => {
        this.puntuacionCompuestaCIT = res;
        this.globals.CITCompuesta = this.puntuacionCompuestaCIT.puntuacion;
        this.intervalosConfianza[4] = this.puntuacionCompuestaCIT.intervaloConfianza;
        this.percentiles[4] = this.puntuacionCompuestaCIT.rangoPercentil;
        this.puntuacionesCompuestas[4] = this.puntuacionCompuestaCIT.puntuacion;
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
            y: this.puntuacionesCompuestas[0]
          },
          {
            name: 'Razonamiento perceptual',
            y: this.puntuacionesCompuestas[1]
          },
          {
            name: 'Memoria de trabajo',
            y: this.puntuacionesCompuestas[2]
          },
          {
            name: 'Velocidad de procesamiento',
            y: this.puntuacionesCompuestas[3]
          },
          {
            name: 'CI Total',
            y: this.puntuacionesCompuestas[4]
          }]
        }
      ]
    });
  }

  finalizarSubprueba(){
    if(this.prueba.tipoPrueba == "WAIS"){
      this.router.navigate(['/analisis']);
    }else{
      this.router.navigate(['/analisis-wisc']);
    }
    
    this.scrollToTop();
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
}
