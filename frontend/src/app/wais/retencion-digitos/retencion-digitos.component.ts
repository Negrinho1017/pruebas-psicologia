import { Component, OnInit } from '@angular/core';
import { Reactivo } from '../../model/Reactivo';
import { Subprueba } from '../../model/Subprueba';
import { Globals } from '../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-retencion-digitos',
  templateUrl: './retencion-digitos.component.html',
  styleUrls: ['./retencion-digitos.component.css']
})
export class RetencionDigitosComponent implements OnInit {
  siguienteReactivo: number = 0;
  selectedRetencionDeDigitos: number;
  digitosRDD: String[] = ["9 - 7","6 - 3","5 - 8 - 2","6 - 9 - 4","7 - 2 - 8 - 6","6 - 4 - 3 - 9"
  ,"4 - 2 - 7 - 3 - 1","7 - 5 - 8 - 3 - 6","3 - 9 - 2 - 4 - 8 - 7",
  "6 - 1 - 9 - 4 - 7 - 3","6 - 9 - 1 - 7 - 4 - 2 - 8","4 - 1 - 7 - 9 - 3 - 8 - 6"
  ,"3 - 8 - 2 - 9 - 6 - 1 - 7 - 4","5 - 8 - 1 - 3 - 2 - 6 - 4 - 7","2 - 7 - 5 - 8 - 6 - 3 - 1 - 9 - 4",
  "7 - 1 - 3 - 9 - 4 - 2 - 5 - 6 - 8"];
  digitosRDI: String[] = ["3 - 1","2 - 4","4 - 6","5 - 7","6 - 2 - 9 ","4 - 7 - 5","8 - 2 - 7 - 9",
  "4 - 9 - 6 - 8","6 - 5 - 8 - 4 - 3","1 - 5 - 4 - 8 - 6","5 - 3 - 7 - 4 - 1 - 8",
  "7 - 2 - 4 - 8 - 5 - 6","8 - 1 - 4 - 9 - 3 - 6 - 2","4 - 7 - 3 - 9 - 6 - 2 - 8",
  "9 - 4 - 3 - 7 - 6 - 2 - 1 - 8","7 - 2 - 8 - 1 - 5 - 6 - 4 - 3"];
  respuestasRDI: String[] = [];
  digitosRDS: String[] = ["1 - 2","4 - 2","3 - 1 - 6","0 - 9 - 4","8 - 7 - 9 - 2",
  "4 - 8 - 7 - 1","2 - 6 - 9 - 1 - 7","3 - 8 - 3 - 5 - 8","2 - 1 - 7 - 4 - 3 - 6",
  "6 - 2 - 5 - 2 - 3 - 4","7 - 5 - 7 - 6 - 8 - 6 - 2","4 - 8 - 2 - 5 - 4 - 3 - 5",
  "5 - 8 - 7 - 2 - 7 - 5 - 4 - 5","9 - 4 - 9 - 7 - 3 - 0 - 8 - 4",
  "5 - 0 - 1 - 1 - 3 - 2 - 1 - 0 - 5","2 - 7 - 1 - 4 - 8 - 4 - 2 - 9 - 6"];
  respuestasRDS: String[] = ["1 - 2","2 - 4","1 - 3 - 6","0 - 4 - 9","2 - 7 - 8 - 9",
  "1 - 4 - 7 - 8","1 - 2 - 6 - 7 - 9","3 - 3 - 5 - 8 - 8","1 - 2 - 3 - 4 - 6 - 7",
  "2 - 2 - 3 - 4 - 5 - 6","2 - 5 - 6 - 6 - 7 - 7 - 8","2 - 3 - 4 - 4 - 5 - 5 - 8",
  "2 - 4 - 5 - 5 - 5 - 7 - 7 - 8","0 - 3 - 4 - 4 - 7 - 8 - 9 - 9",
  "0 - 0 - 1 - 1 - 1 - 2 - 3 - 5 - 5","1 - 2 - 2 - 4 - 4 - 6 - 7 - 8 - 9"]
  listaCalificacionesRDD: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  listaCalificacionesRDI: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  listaCalificacionesRDS: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  habilitaReactivoRDD: boolean[] = [false, false, false, false, false, false, false, false, false
   ,false, false, false, false, false, false, false, false, false];
  habilitaReactivoRDI: boolean[] = [false, false, false, false, false, false, false, false, false
    ,false, false, false, false, false, false, false, false, false];
  habilitaReactivoRDS: boolean[] = [false, false, false, false, false, false, false, false, false
      ,false, false, false, false, false, false, false, false, false];
  listaCalificaciones: number[] = [];
  puntuacionRDD: number = 0;
  puntuacionRDI: number = 0;
  puntuacionRDS: number = 0;
  puntuacion: number = 0;
  reactivosCalificados: Reactivo[] = [];
  subprueba: Subprueba = new Subprueba();
  reactivoActual: Reactivo;
  hayDiscontinuacion: boolean;
  constructor( private globals: Globals, private route: ActivatedRoute,
    private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.construirRespuestasRDI();
    this.selectedRetencionDeDigitos = 1;
  }

  construirRespuestasRDI(){
    var i = 0;
    for (let ensayo of this.digitosRDI){
      this.respuestasRDI[i] = this.digitosRDI[i].split('').reverse().join('');
      i++;
    }
  }

  calificarReactivo(puntuacionReactivo: number, numeroReactivo, numeroRD: number){
    if(numeroRD == 1){
      this.listaCalificacionesRDD[numeroReactivo] = (puntuacionReactivo); 
      this.obtenerResultadoRDD();   
      this.descontinuarRDD(puntuacionReactivo,numeroReactivo);         
    }
    else if(numeroRD == 2){
      this.listaCalificacionesRDI[numeroReactivo] = (puntuacionReactivo); 
      this.obtenerResultadoRDI();
      this.descontinuarRDI(puntuacionReactivo,numeroReactivo);   
    }
    else if(numeroRD == 3){
      this.listaCalificacionesRDS[numeroReactivo] = (puntuacionReactivo); 
      this.obtenerResultadoRDS();
      this.descontinuarRDS(puntuacionReactivo,numeroReactivo);   
    }    
    this.siguienteReactivo = numeroReactivo + 1;
  }

  descontinuarRDD(puntuacionReactivo: number, numeroReactivo: number): void {
    let deshabilitar: boolean = puntuacionReactivo == 0 && this.listaCalificacionesRDD[numeroReactivo-1] == 0;
    if(numeroReactivo % 2 == 1 ){      
      for (let contador = numeroReactivo+1; contador < this.habilitaReactivoRDD.length; contador++) {        
        this.habilitaReactivoRDD[contador]=deshabilitar;
      }
    }      
  }    

  descontinuarRDI(puntuacionReactivo: number, numeroReactivo: number): void {
    let deshabilitar: boolean = puntuacionReactivo == 0 && this.listaCalificacionesRDI[numeroReactivo-1] == 0;
    if(numeroReactivo % 2 == 1 ){      
      for (let contador = numeroReactivo+1; contador < this.habilitaReactivoRDI.length; contador++) {        
        this.habilitaReactivoRDI[contador]=deshabilitar;
      }
    }      
  }

  descontinuarRDS(puntuacionReactivo: number, numeroReactivo: number): void {
    let deshabilitar: boolean = puntuacionReactivo == 0 && this.listaCalificacionesRDS[numeroReactivo-1] == 0;
    if(numeroReactivo % 2 == 1 ){      
      for (let contador = numeroReactivo+1; contador < this.habilitaReactivoRDS.length; contador++) {        
        this.habilitaReactivoRDS[contador]=deshabilitar;
      }
    }      
  }
  
  obtenerResultadoRDD(){
    for (let puntuacionReactivo of this.listaCalificacionesRDD) {
      this.puntuacion = this.puntuacion + puntuacionReactivo;
    } 
    this.puntuacionRDD = this.puntuacion;
    this.puntuacion = 0;
  }

  crearReactivos(){
    var i = 0;
    this.listaCalificaciones = this.listaCalificacionesRDD.concat(this.listaCalificacionesRDI).concat(this.listaCalificacionesRDS)
    for (let calificacionReactivo of this.listaCalificaciones) {
      this.reactivoActual = new Reactivo();
      this.reactivoActual.puntuacion=calificacionReactivo;
      this.reactivosCalificados[i] = (this.reactivoActual);
      i++;
    }
  }

  obtenerResultadoRDI(){
    for (let puntuacionReactivo of this.listaCalificacionesRDI) {
      this.puntuacion = this.puntuacion + puntuacionReactivo;
    } 
    this.puntuacionRDI = this.puntuacion;
    this.puntuacion = 0;
  }

  obtenerResultadoRDS(){
    for (let puntuacionReactivo of this.listaCalificacionesRDS) {
      this.puntuacion = this.puntuacion + puntuacionReactivo;
    } 
    this.puntuacionRDS = this.puntuacion;
    this.puntuacion = 0;
  }

  obtenerPuntuacionTotal(){
    this.puntuacion = this.puntuacionRDD + this.puntuacionRDI + this.puntuacionRDS;
    this.selectedRetencionDeDigitos = 4;
  }

  finalizarSubprueba(){    
    this.crearReactivos();
    this.subprueba.reactivos = this.reactivosCalificados;
    this.subprueba.numeroSubprueba = 3;
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.subprueba.nombre="Retención de dígitos";
    this.puntuacionEscalarService.obtenerPuntuacionEscalarRetencionDigitos("20:0-24:11",this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.router.navigate(['/matrices']);
    });    
  }

  habilitarReactivo(i, numeroPrueba): boolean {
    let activar: boolean = false;
    switch (numeroPrueba) {
      case 1:
        activar = this.habilitaReactivoRDD[i];    
        break;
      case 2:
        activar = this.habilitaReactivoRDI[i];    
        break;
      case 3:
        activar = this.habilitaReactivoRDS[i];    
        break;
      default:
        break;
    }
    return activar;
  }

  getReactivoSiguiente(): number {
    return this.siguienteReactivo;   
  }
}