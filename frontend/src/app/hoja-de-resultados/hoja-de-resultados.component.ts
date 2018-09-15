import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { HojaDeResultadosService } from './hoja-de-resultados.service';
import { EdadPersona } from '../model/EdadPersona';
import { Prueba } from '../model/Prueba';
import { Persona } from '../model/Persona';
import swal from 'sweetalert'
import { RamaDelConocimiento } from '../model/RamaDelConocimiento';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';

@Component({
  selector: 'app-hoja-de-resultados',
  templateUrl: './hoja-de-resultados.component.html',
  styleUrls: ['./hoja-de-resultados.component.css']
})
export class HojaDeResultadosComponent implements OnInit {
  subpruebas: String[] = ["Diseño con cubos", "Semejanzas", "Retención de dígitos", "Matrices",
    "Vocabulario", "Aritmética", "Búsqueda de símbolos", "Rompecabezas visual", "Información",
    "Claves"];
  fechaNacimiento: String;
  fechaEvaluacion: String;
  edad: EdadPersona;
  fechas: boolean = false;
  nombreEvaluado: String;
  idEvaluado: String;
  nombreExaminador: String;
  puntuacionesNaturales: number[] = [5, 4, 6, 7, 12, 15, 7, 8, 9, 11];
  prueba: Prueba;
  evaluado: Persona;

  constructor( private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private globals: Globals) { 
    }

  ngOnInit() {
    this.evaluado = new Persona();
    this.prueba = new Prueba();
  }

  graficaComprensionVerbal = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Comprensión verbal'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        color: 'black',
        name: "Comprensión verbal",
        data: [{
          name: 'Semejanzas',
          y: this.puntuacionesNaturales[1]
        },
        {
          name: 'Vocabulario',
          y: this.puntuacionesNaturales[4]
        },
        {
          name: 'Información',
          y: this.puntuacionesNaturales[8]
        }]
      }
    ]
  });

  graficaRazonamientoPerceptual = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Razonamiento perceptual'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        color: 'black',
        name: "Razonamiento perceptual",
        data: [{
          name: 'Diseño de cubos',
          y: this.puntuacionesNaturales[0]
        },
        {
          name: 'Matrices',
          y: this.puntuacionesNaturales[3]
        },
        {
          name: 'Rompecabezas visual',
          y: this.puntuacionesNaturales[7]
        }]
      }
    ]
  });

  graficaMemoriaDeTrabajo = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Memoria de trabajo'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        color: 'black',
        name: "Memoria de trabajo",
        data: [{
          name: 'Retención de dígitos',
          y: this.puntuacionesNaturales[2]
        },
        {
          name: 'Aritmética',
          y: this.puntuacionesNaturales[5],
        }],
      }
    ]
  });

  graficaVelocidadProcesamiento = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Velocidad de procesamiento'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        color: 'black',
        name: "Velocidad de procesamiento",
        data: [{
          name: 'Búsqueda de símbolos',
          y: this.puntuacionesNaturales[6]
        },
        {
          name: 'Claves',
          y: this.puntuacionesNaturales[9]
        }]
      }
    ]
  });

  calcularEdad(){
    const fechaNacimiento = new DatePipe('en-US').transform(this.fechaNacimiento, 'dd/MM/yyyy');
    const fechaEvaluacion = new DatePipe('en-US').transform(this.fechaEvaluacion, 'dd/MM/yyyy');
    this.hojaDeResultadosService.obtenerEdadEvaluado(fechaNacimiento,fechaEvaluacion).subscribe(res => {
      this.edad = res;
      this.fechas = true;
    });
  }

  validarFechas(){
    if(this.fechaNacimiento != undefined && this.fechaEvaluacion != undefined){
      this.calcularEdad();
    }
  }

  inicializarPrueba(){
    //this.mensajeConfirmacion("Seguro que desea continuar");
    if(this.datosValidados()){
      this.evaluado.fechaDeNacimiento = this.fechaNacimiento;
      this.evaluado.id = this.idEvaluado;
      this.evaluado.nombreCompleto = this.nombreEvaluado;
      this.prueba.edadEvaluado = this.edad;
      this.prueba.evaluado = this.evaluado;
      this.prueba.nombreExaminador = this.nombreExaminador;
      this.prueba.fechaEvaluacion = this.fechaEvaluacion;
      this.prueba.tipoPrueba = "WAIS";
      this.llenarRamasDelConocimiento();
      this.hojaDeResultadosService.crearPrueba(this.prueba);
    } 
  }

  datosValidados(): boolean{
    if(this.fechaEvaluacion == undefined){
      this.mensajeError("Falta la fecha de evaluación");
      return false;
    } else if(this.nombreExaminador == undefined){
      this.mensajeError("Falta el nombre del examinador");
      return false;
    } else if(this.nombreEvaluado == undefined){
      this.mensajeError("Falta el nombre del evalaudo");
      return false;
    } else if(this.idEvaluado == undefined){
      this.mensajeError("Falta la identificación");
      return false;
    } else if(this.fechaNacimiento == undefined){
      this.mensajeError("Falta la fecha de nacimiento");
      return false;
    } else{
      this.mensajeExito("Prueba inicializada satisfactoriamente")
      return true;
    }
  }

  llenarRamasDelConocimiento(){
    this.prueba.ramaDelConocimiento = [];
    this.prueba.ramaDelConocimiento[0] = new RamaDelConocimiento();
    this.prueba.ramaDelConocimiento[1] = new RamaDelConocimiento();;
    this.prueba.ramaDelConocimiento[2] = new RamaDelConocimiento();;
    this.prueba.ramaDelConocimiento[3] = new RamaDelConocimiento();;
    this.prueba.ramaDelConocimiento[0].nombre = "Comprensión verbal";
    this.prueba.ramaDelConocimiento[1].nombre = "Razonamiento perceptual";
    this.prueba.ramaDelConocimiento[2].nombre = "Memoria de trabajo";
    this.prueba.ramaDelConocimiento[3].nombre = "Velocidad de procesamiento";
  }

  mensajeConfirmacion(mensaje: string) {
    swal({
      title: 'Error!',
      text: mensaje,
      buttons: {
        cancel: true,
        confirm: true,
      }
    });
  }

  mensajeError(mensaje: string) {
    swal({
      title: 'Error!',
      icon: "error",
      text: mensaje,
    });
  }

  mensajeExito(mensaje: string) {
    swal({
      title: 'Excelente!',
      icon: "success",
      text: mensaje,
    });
  }

  siguiente(){
    this.globals.idEvaluado = this.idEvaluado;
    //this.router.navigate(['/semejanzas', this.idEvaluado]);
    this.router.navigate(['/semejanzas']);
  }
  
}
