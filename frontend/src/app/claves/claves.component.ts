import { Component, OnInit } from '@angular/core';
import { Subprueba } from '../model/Subprueba';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';

@Component({
  selector: 'app-claves',
  templateUrl: './claves.component.html',
  styleUrls: ['./claves.component.css']
})
export class ClavesComponent implements OnInit {
  puntuacion: number = 0;
  subprueba: Subprueba = new Subprueba();
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router ) { }

  ngOnInit() {
    this.subprueba.numeroSubprueba = 10;
    this.subprueba.nombre = "Claves";
  }

  finalizarSubprueba(){
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
    this.router.navigate(['/hoja-resultados']);
  }

}
