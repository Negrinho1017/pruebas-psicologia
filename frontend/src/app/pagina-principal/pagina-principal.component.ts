import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {  
  constructor(private router: Router, private globals:Globals) { }

  ngOnInit() {
    this.globals.mostrarNavBar = false;
  }

  cambiarAPruebaWAIS() {
    this.globals.idPrueba = 1;
    this.globals.rutas = ["/diseno-cubos","/semejanzas","/retencion-digitos","/matrices","/vocabulario",
    "/aritmetica","/busqueda-simbolos","/rompecabezas-visual","/informacion","/claves"];
    this.globals.subpruebas = ["Diseño de cubos","Semejanzas","Retención de dígitos","Matrices",
    "Vocabulario","Aritmética","Búsqueda de símbolos","Rompecabezas visual","Información","Claves"];
    localStorage.setItem('tipoPrueba', "WAIS");
    this.router.navigate(['/ingreso-de-datos']);    
  }

  cambiarAPruebaWISC(){
    this.globals.idPrueba = 2;
    this.globals.rutas = ["/diseno-cubos-wisc","/semejanzas-wisc","/retencion-digitos-wisc","/conceptos-con-dibujos",
    "/vocabulario-wisc","/numeros-letras-wisc","/busqueda-simbolos","/matrices-wisc","/comprension-wisc","/claves-wisc"];
    this.globals.subpruebas = ["Diseño de cubos","Semejanzas","Retención de dígitos","Conceptos con dibujos",
    "Vocabulario","Sucesión de números y letras","Búsqueda de símbolos","Matrices","Comprensión","Claves"];
    localStorage.setItem('tipoPrueba', "WISC");
    this.router.navigate(['/ingreso-de-datos']);
  }
}
