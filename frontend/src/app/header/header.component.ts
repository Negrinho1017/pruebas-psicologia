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
  hay10Subpruebas: boolean = false;
  constructor(private hojaDeResultadosService: HojaDeResultadosService, private globals: Globals ) { }

  ngOnInit() {
    this.hojaDeResultadosService.obtenerPruebaPorIdDelEvaluado(<string> this.globals.idEvaluado)    
      .subscribe(res => {
        this.prueba = res;
        this.evaluado = this.prueba.evaluado.nombreCompleto;
        this.hay10Subpruebas =  this.prueba.ramaDelConocimiento[0].subpruebas.length + this.prueba.ramaDelConocimiento[1].subpruebas.length
          + this.prueba.ramaDelConocimiento[2].subpruebas.length + this.prueba.ramaDelConocimiento[3].subpruebas.length >= 10
      });
  }

  salir(){
    localStorage.clear();
  }
  
  eliminarPrueba(){
    this.hojaDeResultadosService.eliminarPrueba(this.globals.idEvaluado).subscribe( res => {
      this.mensajeSuccess("Eliminada la prueba correspondiente a "+res.evaluado.nombreCompleto);
    }, error => {
      this.mensajeExcepcion(error.error.mensaje);
    });
    localStorage.clear();
  }

  mensajeExcepcion(mensaje: string) {
    swal({
      title: 'Error',
      icon: "error",
      text: mensaje,
    });
  }

  mensajeSuccess(mensaje: string) {
    swal({
      title: 'Excelente',
      icon: "success",
      text: mensaje,
    });
  }

}
