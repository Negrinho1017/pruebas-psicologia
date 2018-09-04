import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retencion-digitos',
  templateUrl: './retencion-digitos.component.html',
  styleUrls: ['./retencion-digitos.component.css']
})
export class RetencionDigitosComponent implements OnInit {
  selectedRetencionDeDigitos: number;
  digitosRDD: String[] = ["9 - 7","6 - 3","5 - 8 - 2","6 - 9 - 4","7 - 2 - 8 - 6","6 - 4 - 3 - 9"
  ,"4 - 2 - 7 - 3 - 1","7 - 5 - 8 - 3 - 6","3 - 9 - 2 - 4 - 8 - 7",
  "6 - 1 - 9 - 4 - 7 - 3","6 - 9 - 1 - 7 - 4 - 2 - 8","4 - 1 - 7 - 9 - 3 - 8 - 6"
  ,"3 - 8 - 2 - 9 - 6 - 1 - 7 - 4","5 - 8 - 1 - 3 - 2 - 6 - 4 - 7","2 - 7 - 5 - 8 - 6 - 3 - 1 - 9 - 4",
  "7 - 1 - 3 - 9 - 4 - 2 - 5 - 6 - 8"];
  numero: number;

  public pasarDeNumeroDeReactivo(i: number){
    this.numero = i/2 + 0.5;
  }
  constructor() { }

  ngOnInit() {
  }

}
