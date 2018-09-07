import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  reactivos: String[] = ["1. Lunes", "2. Forma", "3. Termómetro", "4. Segundos", "5. Agua", "6. Brasil"];
  constructor() { }

  ngOnInit() {
  }

}
