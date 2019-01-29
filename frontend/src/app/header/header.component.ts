import { Component, OnInit } from '@angular/core';
import { HojaDeResultadosService } from '../wais/hoja-de-resultados/hoja-de-resultados.service';
import { Globals } from '../globals';
import { Prueba } from '../model/Prueba';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  evaluado: String;
  prueba: Prueba;
  constructor(private hojaDeResultadosService: HojaDeResultadosService, private globals: Globals ) { }

  ngOnInit() {
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(<string> this.globals.idEvaluado)    
      .subscribe(res => {
        this.prueba = res;
        this.evaluado = this.prueba.evaluado.nombreCompleto;
      });
  }

  salir(){
    localStorage.clear();
  }

}
