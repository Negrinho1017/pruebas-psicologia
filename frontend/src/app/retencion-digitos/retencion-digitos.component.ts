import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retencion-digitos',
  templateUrl: './retencion-digitos.component.html',
  styleUrls: ['./retencion-digitos.component.css']
})
export class RetencionDigitosComponent implements OnInit {
  selectedRetencionDeDigitos: number;
  digitosRDD: String[] = ["9-7","6-3","5-8-2","6-9-4","7-2-8-6","6-4-3-9"];
  numero: number;

  public pasarDeNumeroDeReactivo(i: number){
    this.numero = i/2 + 0.5;
  }
  constructor() { }

  ngOnInit() {
  }

}
