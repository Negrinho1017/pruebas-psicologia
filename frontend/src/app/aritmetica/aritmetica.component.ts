import { Component, OnInit } from '@angular/core';
import { EnsayoRespuestaModel } from '../model/EnsayoRespuestaModel';

@Component({
  selector: 'app-aritmetica',
  templateUrl: './aritmetica.component.html',
  styleUrls: ['./aritmetica.component.css']
})
export class AritmeticaComponent implements OnInit {
  respuestasCorrectas: EnsayoRespuestaModel[] = [new EnsayoRespuestaModel("*1. Flores","Cuenta hasta 3"),
  new EnsayoRespuestaModel("*2. Manzanas","Cuenta hasta 10"),new EnsayoRespuestaModel("3. Bates","6"),
  new EnsayoRespuestaModel("4. Pájaros","9"),new EnsayoRespuestaModel("5. Correas","2"),
  new EnsayoRespuestaModel("6. Cobijas","8"),new EnsayoRespuestaModel("+17. Minutos","186")];
  puntuacion: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
