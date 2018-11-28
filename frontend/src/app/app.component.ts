import { Component, OnChanges } from '@angular/core';
import { Globals } from './globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'wais';
  idPrueba = this.globals.idPrueba; 
  mostrarNavBar = this.globals.mostrarNavBar;

  constructor(private globals: Globals) { }

  salir(){
    localStorage.removeItem('idEvaluado');
    this.globals.mostrarNavBar = false;
  }
}
