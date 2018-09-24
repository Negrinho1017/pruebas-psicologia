import { Component, OnInit } from '@angular/core';
import { Subprueba } from '../../model/Subprueba';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-claves',
  templateUrl: './claves.component.html',
  styleUrls: ['./claves.component.css']
})
export class ClavesComponent implements OnInit {
  puntuacion: number = 0;
  subprueba: Subprueba = new Subprueba();
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.subprueba.numeroSubprueba = 10;
    this.subprueba.nombre = "Claves";
  }

  finalizarSubprueba(){
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarClaves("20:0-24:11",this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.router.navigate(['/hoja-resultados']);
    });
  }

}
