import { Component, OnInit } from '@angular/core';
import { Subprueba } from '../model/Subprueba';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from '../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-busqueda-simbolos',
  templateUrl: './busqueda-simbolos.component.html',
  styleUrls: ['./busqueda-simbolos.component.css']
})
export class BusquedaSimbolosComponent implements OnInit {
  puntuacion: number = 0;
  correctas: number = 0;
  incorrectas: number = 0;
  subprueba: Subprueba = new Subprueba();
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.subprueba.nombre = "Búsqueda de símbolos";
    this.subprueba.numeroSubprueba = 7;
  }

  calcularPuntuacion(){
    this.puntuacion = this.correctas - this.incorrectas
  }

  finalizarSubprueba(){
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarBusquedaSimbolos("20:0-24:11",this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.router.navigate(['/rompecabezas-visual']);
    });
    
  }

}
