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
    this.router.navigate(['/ingreso-de-datos']);    
  }

  cambiarAPruebaWISC(){
    this.globals.idPrueba = 2;
    this.router.navigate(['/ingreso-de-datos']);
  }
}
