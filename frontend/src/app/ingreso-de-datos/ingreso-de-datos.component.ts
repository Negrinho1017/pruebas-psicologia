import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { EdadPersona } from '../model/EdadPersona';
import { Prueba } from '../model/Prueba';
import { Persona } from '../model/Persona';
import { Router } from '@angular/router';
import { HojaDeResultadosService } from '../wais/hoja-de-resultados/hoja-de-resultados.service';
import { RamaDelConocimiento } from '../model/RamaDelConocimiento';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert'

@Component({
  selector: 'app-ingreso-de-datos',
  templateUrl: './ingreso-de-datos.component.html',
  styleUrls: ['./ingreso-de-datos.component.css']
})
export class IngresoDeDatosComponent implements OnInit {
  fechaNacimiento: String;
  fechaEvaluacion: String;
  edad: EdadPersona;
  fechas: boolean = false;
  nombreEvaluado: String;
  idEvaluado: String;
  nombreExaminador: String;
  prueba: Prueba;
  evaluado: Persona;
  
  constructor( private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private globals: Globals ) { }

  ngOnInit() {
    this.evaluado = new Persona();
    this.prueba = new Prueba();
  }

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
      this.siguiente();
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
    this.globals.mostrarNavBar = true;
    //this.router.navigate(['/semejanzas', this.idEvaluado]);
    this.router.navigate(['/diseno-cubos']);
  }
}
