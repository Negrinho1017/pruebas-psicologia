import { Component, OnInit } from '@angular/core';
import { VocabularioService } from './vocabulario.service';

@Component({
  selector: 'app-vocabulario',
  templateUrl: './vocabulario.component.html',
  styleUrls: ['./vocabulario.component.css']
})

export class VocabularioComponent implements OnInit {
  //reactivos: String[] = ["1. Libro", "2. Avión", "3. Canasta", "*4. Manzana", "5. Finalizar", "6. Cama"];
  reactivos: String[];
  puntuacion: number = 0;
  constructor( private vocabularioService: VocabularioService) { }
  
  ngOnInit() {
    this.obtenerReactivosVocabulario();
  }

  obtenerReactivosVocabulario() {
    this.vocabularioService.obtenerReactivosVocabulario().subscribe(res => {
      this.reactivos = res;
    });
  }

  

}
