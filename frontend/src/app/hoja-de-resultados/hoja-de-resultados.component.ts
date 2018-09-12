import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hoja-de-resultados',
  templateUrl: './hoja-de-resultados.component.html',
  styleUrls: ['./hoja-de-resultados.component.css']
})
export class HojaDeResultadosComponent implements OnInit {
  subpruebas: String[] = ["Diseño con cubos","Semejanzas","Retención de dígitos","Matrices",
  "Vocabulario","Aritmética","Búsqueda de símbolos","Rompecabezas visual","Información",
  "Claves"]
  constructor() { }

  ngOnInit() {
  }

}
