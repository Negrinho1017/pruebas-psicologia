import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numeros-letras',
  templateUrl: './numeros-letras.component.html',
  styleUrls: ['./numeros-letras.component.css']
})
export class NumerosLetrasComponent implements OnInit {
  primerosReactivos: String[] = ["C - 1","A - 4","2 - B","D - 1","4 - C","E - 5","3 - A","C - 1"];
  primerasRespuestas: String [] = ["1 - C","4 - A","2 - B","1 - D","4 - C","5 - E","3 - A","1 - C"];
  reactivos: String[] = ["2 - B - 1","D - 5 - A","2 - B - 4","5 - C - A","3 - 2 - A","F - E - 1",
  "1 - G - 7","H - 9 - 4","3 - Q - 7","Z - 8 - N","M - 6 - U","P - 3 - N","V - 1 - J - 5","7 - X - 4 - G",
  "S - 9 - T - 6","5 - Q - 3 - H - 6","8 - E - 6 - F - 1","K - 4 - C - 2 - S","M - 4 - P - 7 - R - 2",
  "6 - N - 9 - J - 2 - S","U - 6 - H - 5 - F - 3","R - 7 - V - 4 - Y - 8 - F","9 - X - 2 - J - 3 - N - 7",
  "M - 1 - Q - 8 - R - 4 - D","6 - P - 7 - S - 2 - N - 9 - A","U - 1 - R - 9 - X - 4 - K - 3",
  "7 - M - 2 - T - 6 - F - 9 - A"];
  respuestas: String[] = ["1 - 2 - B","5 - A - D","2 - 4 - B","5 - A - C,    A - C - 5","2 - 3 - A, A - 2 - 3",
  "1 - E - F, E - F - 1","1 - 7 - G, G - 1 - 7","4 - 9 - H, H - 4 - 9","3 - 7 - Q, Q - 3 - 7",
  "8 - N - Z, N - Z - 8","6 - M - U, M - U - 6","3 - N - P, N - P - 3","1 - 5 - J - V, J - V - 1 - 5",
  "4 - 7 - G - X, G - X - 4 - 7","6 - 9 - S - T, S - T - 6 - 9","3 - 5 - 6 - H - Q, H - Q - 3 - 5 - 6",
  "1 - 6 - 8 - E - F, E - F - 1 - 6 - 8","2 - 4 - C - K - S, C - K - S - 2 - 4",
  "2 - 4 - 7 - M - P - R, M - P - R - 2 - 4 - 7","2 - 6 - 9 - J - N - S, J - N - S - 2 - 6 - 9",
  "3 - 5 - 6 - F - H - U, F - J - U - 3 - 5 - 6","4 - 7 - 8 - F - R - V - Y, F - R - V - Y - 4 - 7 - 8",
  "2 - 3 - 7 - 9 - J - N - X, J - N - X - 2 - 3 - 7 - 9","1 - 4 - 8 - D - M - Q - R, D - M - Q - R - 1 - 4 - 8",
  "2 - 6 - 7 - 9 - A - N - P - S, A - N - P - S - 2 - 6 - 7 - 9",
  "1 - 3 - 4 - 9 - K - R - U - X, K - R - U - X - 1 - 3 - 4 - 9",
  "2 - 6 - 7 - 9 - A - F - M - Y - T, A - F - M - T - 2 - 6 - 7 - 9"];
  constructor() { }

  ngOnInit() {
  }

}
