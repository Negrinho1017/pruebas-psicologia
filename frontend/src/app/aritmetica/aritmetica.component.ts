import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-aritmetica',
  templateUrl: './aritmetica.component.html',
  styleUrls: ['./aritmetica.component.css']
})
export class AritmeticaComponent implements OnInit {
  respuestasCorrectas: String[] = ["3","Cuenta hasta 3","Cuenta hasta 10","6","9","2","8"];
  constructor() { }

  ngOnInit() {
  }

}
