import { Component, OnChanges } from '@angular/core';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'wais';
  constructor(private globals:Globals){

  }
  idPrueba = this.globals.idPrueba; 
  mostrarNavBar = this.globals.mostrarNavBar;
}
