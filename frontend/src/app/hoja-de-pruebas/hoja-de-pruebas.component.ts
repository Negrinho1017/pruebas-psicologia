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
  constructor( private hojaDePruebasService: HojaDePruebasService, private globals: Globals,
    private router: Router) { }

  ngOnInit() {
    this.hojaDePruebasService.obtenerTodasLasPruebas(localStorage.getItem('tipoPrueba'))    
      .subscribe(res => {
        this.pruebas = res;
        this.globals.prueba.evaluado.nombreCompleto
      }, error => {
        this.mensajeError(error.error.mensaje);
      });
  }

  consultarPrueba(idEvaluado: String) {        
    this.globals.idEvaluado = idEvaluado;
    localStorage.setItem('idEvaluado', <string> this.globals.idEvaluado);
    if(localStorage.getItem('tipoPrueba')=="WISC"){
      this.router.navigate(['/hoja-resultados-wisc']);
    }else{
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

}
