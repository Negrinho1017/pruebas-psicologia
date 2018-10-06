import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subpruebas-opcionales',
  templateUrl: './subpruebas-opcionales.component.html',
  styleUrls: ['./subpruebas-opcionales.component.css']
})
export class SubpruebasOpcionalesComponent implements OnInit {
  listaSubpruebas: String[] = ["Diseños de cubos", "Semejanzas","Retención de dígitos","Matrices","Vocabulario",
  "Aritmética","Búsqueda de símbolos","Rompecabezas visual","Información","Claves","Sucesión de números y letras",
  "Peso figurado","Comprensión","Cancelación","Figuras incompletas"];
  constructor() { }
  ngOnInit() {
  }

}
