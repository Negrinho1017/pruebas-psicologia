import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claves',
  templateUrl: './claves.component.html',
  styleUrls: ['./claves.component.css']
})
export class ClavesComponent implements OnInit {
  puntuacion: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
