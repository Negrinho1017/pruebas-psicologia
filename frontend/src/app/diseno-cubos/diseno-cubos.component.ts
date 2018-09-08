import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diseno-cubos',
  templateUrl: './diseno-cubos.component.html',
  styleUrls: ['./diseno-cubos.component.css']
})
export class DisenoCubosComponent implements OnInit {
  imagenesCubos: any[] = ["Cubo1", "Cubo2", "Cubo3", "Cubo4", "Cubo5", "Hola", 
  "", "","", "", "", "", "", "", ""];
  constructor() { }

  ngOnInit() {
  }

}
