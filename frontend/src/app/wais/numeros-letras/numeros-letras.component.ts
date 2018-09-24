import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numeros-letras',
  templateUrl: './numeros-letras.component.html',
  styleUrls: ['./numeros-letras.component.css']
})
export class NumerosLetrasComponent implements OnInit {
  primerosReactivos: String[] = ["C - 1","A - 4","2 - B","D - 1","4 - C","E - 5","3 - A","C - 1"];
  primerasRespuestas: String [] = ["1 - C","4 - A","2 - B","1 - D","4 - C","5 - E","3 - A","1 - C"];
  numerales: any[] = ["MA","PA",1,2];
  constructor() { }

  ngOnInit() {
  }

}
