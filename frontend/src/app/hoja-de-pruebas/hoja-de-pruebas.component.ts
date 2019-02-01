import { Component, OnInit } from '@angular/core';
import { HojaDePruebasService } from './hoja-de-pruebas.service';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { Prueba } from '../model/Prueba';

@Component({
  selector: 'app-hoja-de-pruebas',
  templateUrl: './hoja-de-pruebas.component.html',
  styleUrls: ['./hoja-de-pruebas.component.css']
})
export class HojaDePruebasComponent implements OnInit {
  pruebas: Prueba[];
  nombreEvaluado: String;
  eliminar: boolean = false;
  consultaHecha: boolean = false;
  constructor(private hojaDePruebasService: HojaDePruebasService, private globals: Globals,
    private router: Router) { }

  ngOnInit() {
  }

  obtenerPruebasPorNombre() {
    if (this.nombreEvaluado.length > 2) {
      this.hojaDePruebasService.obtenerPruebasPorNombre(localStorage.getItem('tipoPrueba'), <string>this.nombreEvaluado)
        .subscribe(res => {
          this.pruebas = res;
          this.consultaHecha = true;
        }, error => {
          this.mensajeError(error.error.mensaje);
        });
    }
  }

  eliminarPrueba(idEvaluado: String){
    this.hojaDePruebasService.eliminarPrueba(idEvaluado).subscribe( res => {
      this.mensajeSuccess("Eliminada la prueba correspondiente a "+res.evaluado.nombreCompleto);
      localStorage.clear();
      this.router.navigate(['/']);
    }, error => {
      this.mensajeError(error.error.mensaje);
    });
    localStorage.clear();
  }

  activarODesactivarEliminar(){
    if(this.eliminar){
      this.eliminar=false;
    }else{
      this.eliminar=true;
    }
  }

  consultarPrueba(idEvaluado: String) {
    this.globals.idEvaluado = idEvaluado;
    localStorage.setItem('idEvaluado', <string>this.globals.idEvaluado);
    if (localStorage.getItem('tipoPrueba') == "WISC") {
      this.router.navigate(['/hoja-resultados-wisc']);
    } else {
      this.router.navigate(['/hoja-resultados']);
    }
  }

  mensajeError(mensaje: string) {
    swal({
      title: 'Error!',
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
