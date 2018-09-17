import { Component, OnInit } from '@angular/core';
import { Subprueba } from '../model/Subprueba';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';

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
    private router: Router ) { }

  ngOnInit() {
    this.subprueba.nombre = "Búsqueda de símbolos";
    this.subprueba.numeroSubprueba = 7;
  }

  calcularPuntuacion(){
    this.puntuacion = this.correctas - this.incorrectas
  }

  finalizarSubprueba(){
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
    this.router.navigate(['/rompecabezas-visual']);
  }

}
