import { Component, OnInit } from '@angular/core';
import { HojaDeSubpruebasService } from './hoja-de-subpruebas.service';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hoja-de-subpruebas',
  templateUrl: './hoja-de-subpruebas.component.html',
  styleUrls: ['./hoja-de-subpruebas.component.css']
})
export class HojaDeSubpruebasComponent implements OnInit {
  tipoPrueba: String;
  nombreSubpruebasWAIS: String[] = ["Diseño de cubos","Semejanzas","Retención de dígitos","Matrices",
  "Vocabulario","Aritmética","Búsqueda de símbolos","Rompecabezas visual","Información","Claves",
  "Sucesión de números y letras","Peso figurado","Comprensión","Cancelación","Figuras incompletas"];
  nombreSubpruebasWISC: String[] = ["Diseño de cubos","Semejanzas","Retención de dígitos",
  "Conceptos con dibujos","Claves","Vocabulario","Sucesión de números y letras","Matrices","Comprensión",
  "Búsqueda de símbolos","Figuras incompletas","Registros","Información","Aritmética","Pistas"];
  numerosSubprueba: number[] = [];
  constructor( private hojaDeSubpruebasService : HojaDeSubpruebasService, private globals: Globals,
    private router: Router) { }

  ngOnInit() {
    this.tipoPrueba = localStorage.getItem('tipoPrueba');
    this.hojaDeSubpruebasService.obtenerPruebaPorIdDelEvaluado(<string> this.globals.idEvaluado).subscribe(
      res => {
        this.numerosSubprueba = [res.ramaDelConocimiento[0].subpruebas[0].numeroSubprueba, res.ramaDelConocimiento[0].subpruebas[1].numeroSubprueba,
        res.ramaDelConocimiento[0].subpruebas[2].numeroSubprueba, res.ramaDelConocimiento[1].subpruebas[0].numeroSubprueba,
        res.ramaDelConocimiento[1].subpruebas[1].numeroSubprueba, res.ramaDelConocimiento[1].subpruebas[2].numeroSubprueba,
        res.ramaDelConocimiento[2].subpruebas[0].numeroSubprueba, res.ramaDelConocimiento[2].subpruebas[1].numeroSubprueba,
        res.ramaDelConocimiento[3].subpruebas[0].numeroSubprueba, res.ramaDelConocimiento[3].subpruebas[1].numeroSubprueba];
      });
  }

  estaLaSubprueba(numero: number): boolean{
    return this.numerosSubprueba.includes(numero);
  }

  redireccionar(numeroSubprueba: number){
    if(numeroSubprueba == 1){
      this.router.navigate(['/diseno-cubos'])
    }else if(numeroSubprueba == 2){
      this.router.navigate(['/semejanzas'])
    }else if(numeroSubprueba == 3){
      this.router.navigate(['/retencion-digitos'])
    }else if(numeroSubprueba == 4){
      this.router.navigate(['/matrices'])
    }else if(numeroSubprueba == 5){
      this.router.navigate(['/vocabulario'])
    }else if(numeroSubprueba == 6){
      this.router.navigate(['/aritmetica'])
    }else if(numeroSubprueba == 7){
      this.router.navigate(['/busqueda-simbolos'])
    }else if(numeroSubprueba == 8){
      this.router.navigate(['/rompecabezas-visual'])
    }else if(numeroSubprueba == 9){
      this.router.navigate(['/informacion'])
    }else if(numeroSubprueba == 10){
      this.router.navigate(['/claves'])
    }else if(numeroSubprueba == 11){
      this.router.navigate(['/numeros-letras'])
    }else if(numeroSubprueba == 12){
      this.router.navigate(['/peso-figurado'])
    }else if(numeroSubprueba == 13){
      this.router.navigate(['/comprension'])
    }else if(numeroSubprueba == 14){
      this.router.navigate(['/cancelacion'])
    }else{
      this.router.navigate(['/figuras-incompletas'])
    }
  }

}
