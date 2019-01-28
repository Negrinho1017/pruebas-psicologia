import { Component, OnChanges, OnInit } from '@angular/core';
import { Globals } from './globals';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'wais';
  idPrueba = this.globals.idPrueba;
  mostrarNavBar = this.globals.mostrarNavBar;

  constructor(location: PlatformLocation, private globals: Globals, private router: Router) { 
    location.onPopState(() => {
      this.mensajeError("No puedes volver atrás");
      this.router.navigateByUrl('/diseno-cubos');
      history.forward();
      });
  }

  ngOnInit() {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      e.returnValue = confirmationMessage;
      return confirmationMessage;     
    });
  }

  salir() {
    localStorage.removeItem('idEvaluado');
    this.globals.mostrarNavBar = false;
  }

  mensajeError(mensaje: string) {
    swal({
      title: 'Error',
      icon: "error",
      text: mensaje,
    });
  }
}
