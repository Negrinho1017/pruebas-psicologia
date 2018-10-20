import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fortalezas-debilidades',
  templateUrl: './fortalezas-debilidades.component.html',
  styleUrls: ['./fortalezas-debilidades.component.css']
})
export class FortalezasDebilidadesComponent implements OnInit {
  subpruebas: String[] = ["Diseño de cubos","Semejanzas","Retención de dígitos","Matrices","Vocabulario",
  "Aritmética","Búsqueda de símbolos","Rompecabezas visual","Información","Claves"];
  selectedMedia: number = 1;
  constructor() { }

  ngOnInit() {
  }

}
