import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matrices',
  templateUrl: './matrices.component.html',
  styleUrls: ['./matrices.component.css']
})
export class MatricesComponent implements OnInit {
  respuestasCorrectas: number[] = [3,2,1,5,3,4,4,5,1,5,2,3,1,1,5,2,3,2,1,4,5,1,4,2,3,4];
  constructor() { }

  ngOnInit() {
  }

}
