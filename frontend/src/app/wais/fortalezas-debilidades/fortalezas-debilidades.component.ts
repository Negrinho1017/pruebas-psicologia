import { Component, OnInit } from '@angular/core';
import { Subprueba } from 'src/app/model/Subprueba';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { FortalezasDebilidadesService } from './fortalezas-debilidades.service';

@Component({
  selector: 'app-fortalezas-debilidades',
  templateUrl: './fortalezas-debilidades.component.html',
  styleUrls: ['./fortalezas-debilidades.component.css']
})
export class FortalezasDebilidadesComponent implements OnInit {
  subpruebas: String[] = [];
  selectedMedia: number = 1;
  puntuacionesEscalares: number[] = [];
  diferenciasDeLaMedia: number[] = [0,0,0,0,0,0,0,0,0,0];
  puntuacionEscalarMediaCV: number;
  puntuacionEscalarMediaRP: number;
  puntuacionEscalarMediaTotal: number;
  valoresCriticos: number[] = [];
  listaSubpruebas: Subprueba[];
  fortalezasYDebilidades: String[] = [];
  loading: boolean;
  constructor( private globals: Globals, private router: Router,
     private fortalezasDebilidadesService: FortalezasDebilidadesService ) { }

  ngOnInit() {
    this.loading = true;
    this.calcularPuntuacionEscalarMedia();
    this.calcularDiferencias();
    this.fortalezasDebilidadesService.obtenerSubpruebasPorIdEvaluado(this.globals.idEvaluado).subscribe(res => {
      this.listaSubpruebas = res;
      this.subpruebas = [this.listaSubpruebas[3].nombre, this.listaSubpruebas[0].nombre,
      this.listaSubpruebas[6].nombre, this.listaSubpruebas[4].nombre ,this.listaSubpruebas[1].nombre,
      this.listaSubpruebas[7].nombre, this.listaSubpruebas[8].nombre, this.listaSubpruebas[5].nombre,
      this.listaSubpruebas[2].nombre, this.listaSubpruebas[9].nombre]
      this.puntuacionesEscalares = [this.listaSubpruebas[3].puntuacionEscalar, this.listaSubpruebas[0].puntuacionEscalar,
      this.listaSubpruebas[6].puntuacionEscalar, this.listaSubpruebas[4].puntuacionEscalar ,this.listaSubpruebas[1].puntuacionEscalar,
      this.listaSubpruebas[7].puntuacionEscalar, this.listaSubpruebas[8].puntuacionEscalar, this.listaSubpruebas[5].puntuacionEscalar,
      this.listaSubpruebas[2].puntuacionEscalar, this.listaSubpruebas[9].puntuacionEscalar]
      this.calcularPuntuacionEscalarMedia();
      this.calcularDiferencias();
      this.loading=false;
    }); 
  }



  calcularDiferencias(){
    if(this.selectedMedia == 1){
      this.calcularConMediaTotal();
    }else{
      this.calcularConDiferenciasDeLaMedia();
    }
  }
  calcularPuntuacionEscalarMedia(){
    this.puntuacionEscalarMediaCV = (this.puntuacionesEscalares[1]+this.puntuacionesEscalares[4]+this.puntuacionesEscalares[8])/3;
    this.puntuacionEscalarMediaRP = (this.puntuacionesEscalares[0]+this.puntuacionesEscalares[3]+this.puntuacionesEscalares[7])/3;
  }

  evaluarFortalezasYDebilidades(){
    var i = 0;
    for(let diferencia of this.diferenciasDeLaMedia){
      if(diferencia>this.valoresCriticos[i]){
        this.fortalezasYDebilidades[i] = 'F';
      }else{
        this.fortalezasYDebilidades[i] = 'D';
      }
      i++;
    }
  }

  calcularPuntuacionEscalarMediaTotal(){
    var contador = 0;
    for(let calificacionSubprueba of this.puntuacionesEscalares){
      contador += calificacionSubprueba;
    }
    this.puntuacionEscalarMediaTotal = contador/10;
  }

  calcularConMediaTotal(){
    this.calcularPuntuacionEscalarMediaTotal();
    this.valoresCriticos = localStorage.getItem('tipoPrueba')=="WAIS" ? [2.96,3.65,2.55,3.03,2.87,3.08,3.58,3.06,2.52,3.27] : [3.01,3.01,2.87,3.39,3.17,2.70,2.63,2.68,3.44,3.56];
    var i = 0;
    for (let calificacionSubprueba of this.puntuacionesEscalares) {
      this.diferenciasDeLaMedia[i] = calificacionSubprueba - this.puntuacionEscalarMediaTotal;
      i++;
    }
    this.evaluarFortalezasYDebilidades();
  }

  calcularConDiferenciasDeLaMedia(){
    var i = 0;
    this.valoresCriticos = [2.19,2.03,null,2.22,2.17,null,null,2.23,2.03,null];
    for (let calificacionSubprueba of this.puntuacionesEscalares) {
      if(i==1 || i==4 || i==8){
        this.diferenciasDeLaMedia[i] = calificacionSubprueba - this.puntuacionEscalarMediaCV;
      }
      else if(i==0 || i==3 || i==7){
        this.diferenciasDeLaMedia[i] = calificacionSubprueba - this.puntuacionEscalarMediaRP;
      }else{
        this.diferenciasDeLaMedia[i] = null;
      }
      i++;
    }
    this.evaluarFortalezasYDebilidades();
    this.fortalezasYDebilidades[2] = null;
    this.fortalezasYDebilidades[5] = null;
    this.fortalezasYDebilidades[6] = null;
    this.fortalezasYDebilidades[9] = null;
  }

  siguiente() {
    if(localStorage.getItem('tipoPrueba')=='WAIS'){
      this.router.navigate(['/analisis-proceso']);
    }else if(localStorage.getItem('tipoPrueba')=='WISC'){
      this.router.navigate(['/analisis-proceso-wisc']);
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
