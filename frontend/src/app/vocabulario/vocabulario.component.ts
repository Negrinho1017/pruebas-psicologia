import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vocabulario',
  templateUrl: './vocabulario.component.html',
  styleUrls: ['./vocabulario.component.css']
})
export class VocabularioComponent implements OnInit {
  reactivos: String[] = ["1. Libro", "2. Avión", "3. Canasta", "4. Manzana", "5. Finalizar", "6. Cama"];
  constructor() { }

  ngOnInit() {
  }

}
