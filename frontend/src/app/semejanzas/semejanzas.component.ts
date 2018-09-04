import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-semejanzas',
  templateUrl: './semejanzas.component.html',
  styleUrls: ['./semejanzas.component.css']
})
export class SemejanzasComponent implements OnInit {
  reactivos: String[] = ["Dos - Siete", "Tenedor - Cuchara", "Amarillo - Verde",
  "Zanahoria - Brócoli", "Caballo - Tigre", "Piano - Tambor", "Barco - Automóvil", "Nariz - Lengua",
  "Comida - Gasolina", "Capullo - Bebé", "Ancla - Cerca", "Insignia - Corona", "Música - Marea",
  "Poema - Estatua", "Desear - Esperar", "Aceptación - Negación", "Siempre - Nunca", "Permitir - Restreingir",
  "Enemigo - Amigo"];

  constructor() { }

  ngOnInit() {
  }

}
