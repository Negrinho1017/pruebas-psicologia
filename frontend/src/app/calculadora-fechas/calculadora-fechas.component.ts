import { Component, OnInit } from '@angular/core';
import { CalculadoraFechasService } from './calculadora-fechas.service';
import { DatePipe } from '@angular/common';
import { EdadPersona } from '../model/EdadPersona';

@Component({
  selector: 'app-calculadora-fechas',
  templateUrl: './calculadora-fechas.component.html',
  styleUrls: ['./calculadora-fechas.component.css']
})
export class CalculadoraFechasComponent implements OnInit {
  fechaNacimiento: String;
  fechaEvaluacion: String;
  edad: EdadPersona;
  fechas: boolean = false;
  constructor( private calculadoraFechasService:CalculadoraFechasService ) { }

  calcularEdad(){
    const fechaNacimiento = new DatePipe('en-US').transform(this.fechaNacimiento, 'dd/MM/yyyy');
    const fechaEvaluacion = new DatePipe('en-US').transform(this.fechaEvaluacion, 'dd/MM/yyyy');
    this.calculadoraFechasService.obtenerEdadEvaluado(fechaNacimiento,fechaEvaluacion).subscribe(res => {
      this.edad = res;
      this.fechas = true;
    });
  }

  validarFechas(){
    if(this.fechaNacimiento != undefined && this.fechaEvaluacion != undefined){
      this.calcularEdad();
      //this.fechas = true;
    }
  }

  ngOnInit() {
  }

}
