import { Component, OnInit } from '@angular/core';
import { ValorCriticoWAIS } from 'src/app/model/ValorCriticoWAIS';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { AnalisisService } from 'src/app/wais/analisis/analisis.service';
import { FortalezasDebilidadesService } from 'src/app/wais/fortalezas-debilidades/fortalezas-debilidades.service';

@Component({
  selector: 'app-analisis-wisc',
  templateUrl: './analisis-wisc.component.html',
  styleUrls: ['./analisis-wisc.component.css']
})
export class AnalisisWiscComponent implements OnInit {
  comparaciones: String[] = ["ICV - IRP","ICV - IMT","ICV - IVP","IRP - IMT","IRP - IVP","IMT - IVP",
  "Retención de dígitos - Sucesión de números y letras","Claves - Búsqueda de símbolos","Semejanzas - Conceptos con dibujos"];
  p1: String[] = ["ICV","ICV","ICV","IRP","IRP","IMT","Retención de dígitos","Claves", "Semejanzas"];
  p2: String[] = ["IRP","IMT","IVP","IMT","IVP","IVP","Sucesión de números y letras","Búsqueda de símbolos","Conceptos con dibujos"];
  puntuacion1: number[] = [];
  puntuacion2: number[] = [];
  diferencia: number[] = [];
  valorCriticoRD_NL: number = 2.14;
  valorCriticoBS_CL: number = 2.66;
  valorCriticoSE_CD: number = 2.22;
  valoresCriticos: number[] = [];
  loading: boolean;
  hayDiferenciasSignificativas: String[] = [];
  sonLas10SubpruebasPrincipales: boolean;
  seHizoDisenoCubosYRetencionDigitos: boolean;
  valorCriticoWAIS: ValorCriticoWAIS = new ValorCriticoWAIS();
  constructor( private router: Router, private globals: Globals,
    private analisisService: AnalisisService,
    private fortalezasDebilidadesService: FortalezasDebilidadesService ) { }

  ngOnInit() {
    this.loading=true;
    var i = 0
    for(let indice of this.p1){
      if(indice=="ICV"){
        this.puntuacion1[i] = this.globals.indices[0]; 
      } 
      if(indice=="IRP"){
        this.puntuacion1[i] = this.globals.indices[1]; 
      } 
      if(indice=="IMT"){
        this.puntuacion1[i] = this.globals.indices[2]; 
      } 
      if(indice=="IVP"){
        this.puntuacion1[i] = this.globals.indices[3]; 
      } 
      if(indice=="RD"){
        this.puntuacion1[i] = this.globals.retencionDigitos; 
      } 
      if(indice=="BS"){
        this.puntuacion1[i] = this.globals.busquedaSimbolos; 
      } 
      i++;
    }
    i=0;
    for(let indice of this.p2){
      if(indice=="ICV"){
        this.puntuacion2[i] = this.globals.indices[0]; 
      } 
      if(indice=="IRP"){
        this.puntuacion2[i] = this.globals.indices[1]; 
      } 
      if(indice=="IMT"){
        this.puntuacion2[i] = this.globals.indices[2]; 
      } 
      if(indice=="IVP"){
        this.puntuacion2[i] = this.globals.indices[3]; 
      } 
      if(indice=="AR"){
        this.puntuacion2[i] = this.globals.aritmetica; 
      } 
      if(indice=="CL"){
        this.puntuacion2[i] = this.globals.claves; 
      } 
      i++;
    }
    this.obtenerSubpruebas();  
    this.edadEvaluado();  
  }

  obtenerDatos(){
    this.analisisService.obtenerValorCritico(this.globals.edad)
    .subscribe(res => {
      this.valorCriticoWAIS = res;
      this.valoresCriticos=[this.valorCriticoWAIS.valorCriticoICV_IRP, this.valorCriticoWAIS.valorCriticoICV_IMT,
      this.valorCriticoWAIS.valorCriticoICV_IVP, this.valorCriticoWAIS.valorCriticoIRP_IMT,
      this.valorCriticoWAIS.valorCriticoIRP_IVP, this.valorCriticoWAIS.valorCriticoIMT_IVP, this.valorCriticoRD_NL,
      this.valorCriticoBS_CL, this.valorCriticoSE_CD];
      var i = 0;
      for(let valorCritico of this.valoresCriticos){
        if(Math.abs(this.diferencia[i])>valorCritico){
          this.hayDiferenciasSignificativas[i] = "S"
        }else{
          this.hayDiferenciasSignificativas[i] = "N"
        }
        i++;
        this.loading=false;
      } 
    });
  }
  obtenerSubpruebas(){
    this.fortalezasDebilidadesService.obtenerSubpruebasPorIdEvaluado(this.globals.idEvaluado).subscribe(res => {
      this.puntuacion1[6] = res[6].puntuacionEscalar;
      this.puntuacion2[6] = res[7].puntuacionEscalar;
      this.puntuacion1[7] = res[8].puntuacionEscalar;
      this.puntuacion2[7] = res[9].puntuacionEscalar;
      this.puntuacion1[8] = res[0].puntuacionEscalar;
      this.puntuacion2[8] = res[4].puntuacionEscalar;
      this.diferencia = [this.puntuacion1[0]-this.puntuacion2[0],this.puntuacion1[1]-this.puntuacion2[1],
      this.puntuacion1[2]-this.puntuacion2[2], this.puntuacion1[3]-this.puntuacion2[3],
      this.puntuacion1[4]-this.puntuacion2[4], this.puntuacion1[5]-this.puntuacion2[5],
      this.puntuacion1[6]-this.puntuacion2[6], this.puntuacion1[7]-this.puntuacion2[7],
      this.puntuacion1[8]-this.puntuacion2[8]];
    });
  }

  siguiente() {
    this.seHicieronLasSubpruebasPrincipales();
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
  
  seHicieronLasSubpruebasPrincipales(){
    this.analisisService.sonLas10SubpruebasPrincipales(this.globals.idEvaluado)
    .subscribe(res => {
      this.sonLas10SubpruebasPrincipales = res;
      this.seHizoRetencionDigitosYDisenoCubos();
    });
  }

  seHizoRetencionDigitosYDisenoCubos(){
    this.analisisService.seHizoRetencionDigitosYDisenoCubos(this.globals.idEvaluado)
    .subscribe(res => {
      this.seHizoDisenoCubosYRetencionDigitos = res;
      if(this.sonLas10SubpruebasPrincipales){
        this.router.navigate(['/fortalezas-debilidades']);
      }else if(this.seHizoDisenoCubosYRetencionDigitos){
        this.router.navigate(['/analisis-proceso-wisc']);
      }else{
        this.mensajeAlerta("No hay más datos que mostrar");
      }
      this.scrollToTop();
    });
  }
  edadEvaluado(){
    this.analisisService.edadEvaluado(this.globals.idEvaluado)
    .subscribe(res => {
      this.globals.edad = res;
      this.obtenerDatos();
    });
  }

  mensajeAlerta(mensaje: string) {
    swal({
      title: 'Advertencia!',
      icon: "warning",
      text: mensaje,
    });
  }
}
