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
  pruebasAEvaluar: boolean[] = [true,true,true,true,true,true,true,true,true,true,false,false,false,false,false];
  constructor() { }
  
  ngOnInit() {
  }

  metodoPrueba(i: number){
    let variable = <HTMLInputElement>document.getElementById("pruebacheck"+i);
    this.pruebasAEvaluar[i] = variable.checked;
  }
}
