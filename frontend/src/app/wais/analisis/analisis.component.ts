import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../globals';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {
  comparaciones: String[] = ["ICV - IRP","ICV - IMT","ICV - IVP","IRP - IMT","IRP - IVP","IMT - IVP",
  "RD - AR","BS - CL"];
  p1: String[] = ["ICV","ICV","ICV","IRP","IRP","IMT","RD","BS"];
  p2: String[] = ["IRP","IMT","IVP","IMT","IVP","IVP","AR","CL"];
  puntuacion1: number[] = [];
  puntuacion2: number[] = [];
  diferencia: number[] = [];
  constructor( private router: Router, private globals: Globals ) { }

  ngOnInit() {
    var i = 0
    for(let indice of this.p1){
      if(indice=="ICV"){
        this.puntuacion1[i] = this.globals.indices[0]; 
      } 
      if(indice=="IRP"){
        this.puntuacion1[i] = this.globals.indices[1]; 
      } 
      if(indice=="IMT"){
        this.puntuacion1[i] = this.globals.indices[2]; 
      } 
      if(indice=="IVP"){
        this.puntuacion1[i] = this.globals.indices[3]; 
      } 
      if(indice=="RD"){
        this.puntuacion1[i] = this.globals.retencionDigitos; 
      } 
      if(indice=="BS"){
        this.puntuacion1[i] = this.globals.busquedaSimbolos; 
      } 
      i++;
    }
    i=0;
    for(let indice of this.p2){
      if(indice=="ICV"){
        this.puntuacion2[i] = this.globals.indices[0]; 
      } 
      if(indice=="IRP"){
        this.puntuacion2[i] = this.globals.indices[1]; 
      } 
      if(indice=="IMT"){
        this.puntuacion2[i] = this.globals.indices[2]; 
      } 
      if(indice=="IVP"){
        this.puntuacion2[i] = this.globals.indices[3]; 
      } 
      if(indice=="AR"){
        this.puntuacion2[i] = this.globals.aritmetica; 
      } 
      if(indice=="CL"){
        this.puntuacion2[i] = this.globals.claves; 
      } 
      i++;
    }
    this.diferencia = [this.puntuacion1[0]-this.puntuacion2[0],this.puntuacion1[1]-this.puntuacion2[1],
    this.puntuacion1[2]-this.puntuacion2[2], this.puntuacion1[3]-this.puntuacion2[3],
    this.puntuacion1[4]-this.puntuacion2[4], this.puntuacion1[5]-this.puntuacion2[5],
    this.puntuacion1[6]-this.puntuacion2[6], this.puntuacion1[7]-this.puntuacion2[7]];
  }

}
