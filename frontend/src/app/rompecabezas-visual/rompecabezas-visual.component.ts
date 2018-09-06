import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rompecabezas-visual',
  templateUrl: './rompecabezas-visual.component.html',
  styleUrls: ['./rompecabezas-visual.component.css']
})
export class RompecabezasVisualComponent implements OnInit {
  respuestasCorrectas: String[] = ["2, 3, 5","1, 2, 5","1, 4, 6","2, 3, 6","3, 5, 6","1, 3, 6","2, 5, 6","1, 3, 4"];
  constructor() { }

  ngOnInit() {
  }

}
