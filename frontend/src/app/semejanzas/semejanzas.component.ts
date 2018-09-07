import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-semejanzas',
  templateUrl: './semejanzas.component.html',
  styleUrls: ['./semejanzas.component.css']
})
export class SemejanzasComponent implements OnInit {
  reactivos: String[] = ["M. Dos - Siete", "1. Tenedor - Cuchara", "2. Amarillo - Verde",
  "3. Zanahoria - Brócoli", "4. Caballo - Tigre", "5. Piano - Tambor", "6. Barco - Automóvil", "7. Nariz - Lengua",
  "8. Comida - Gasolina", "9. Capullo - Bebé", "10. Ancla - Cerca", "11. Insignia - Corona", "12. Música - Marea",
  "13. Poema - Estatua", "14. Desear - Esperar", "15. Aceptación - Negación", "16. Siempre - Nunca",
  "17. Permitir - Restreingir","18. Enemigo - Amigo"];

  constructor() { }

  ngOnInit() {
  }

}
