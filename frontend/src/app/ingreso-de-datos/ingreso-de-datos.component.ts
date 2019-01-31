import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { EdadPersona } from '../model/EdadPersona';
import { Prueba } from '../model/Prueba';
import { Persona } from '../model/Persona';
import { Router } from '@angular/router';
import { HojaDeResultadosService } from '../wais/hoja-de-resultados/hoja-de-resultados.service';
import { RamaDelConocimiento } from '../model/RamaDelConocimiento';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';
import { FormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-ingreso-de-datos',
  templateUrl: './ingreso-de-datos.component.html',
  styleUrls: ['./ingreso-de-datos.component.css']
})
export class IngresoDeDatosComponent implements OnInit {
  fechaNacimiento: String;
  fechaEvaluacion: String;
  edad: EdadPersona;
  fechas = false;
  nombreEvaluado: String;
  idEvaluado: String;
  nombreExaminador: String;
  prueba: Prueba;
  evaluado: Persona;
  ingresoDatosForm: FormGroup;
  consultarPruebaForm: FormGroup;
  fechaInvalida: Boolean;
  editarPrueba = false;
  mostrarCrearPrueba = true;
  mostrarConsultarPrueba = false;
  idExaminador: String;
  tipoPrueba: string;
  constructor(private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private globals: Globals) { }

  ngOnInit() {
    this.tipoPrueba = localStorage.getItem('tipoPrueba');
    this.ingresoDatosForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      identificacion: new FormControl('', [Validators.required]),
      nombreExaminador: new FormControl('', [Validators.required]),
      idExaminador: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      fechaEvaluacion: new FormControl('', [Validators.required])
    });

    this.consultarPruebaForm = new FormGroup({
      identificacion: new FormControl('', [Validators.required]),
      idExaminador: new FormControl('', [Validators.required])
    });

    this.evaluado = new Persona();
    this.prueba = new Prueba();

    this.ingresoDatosForm.get('fechaEvaluacion').setValidators([this.fechaFinalEsMayor('fechaNacimiento'), Validators.required]);

    this.ingresoDatosForm.get('fechaEvaluacion').valueChanges.subscribe(() => {
      if (this.ingresoDatosForm.get('fechaEvaluacion').hasError('invalidDate')) {
        this.fechaInvalida = true;
      } else {
        this.fechaInvalida = false;
        this.calcularEdad();
      }
    });

    this.ingresoDatosForm.get('fechaNacimiento').valueChanges.subscribe(() => {
      if (this.ingresoDatosForm.get('fechaNacimiento').hasError('invalidDate')) {
        this.fechaInvalida = true;
      } else {
        this.fechaInvalida = false;
        this.calcularEdad();
      }
    });


  }

  verificarDatosRealizarPrueba(){
    this.idExaminador = this.ingresoDatosForm.controls['idExaminador'].value;
    this.hojaDeResultadosService.esPermitidoElUsuario(this.idExaminador).subscribe(
      res => {
        this.inicializarPrueba();
      }, error => {
        this.mensajeError(error.error.mensaje);
      })
  }

  verificarDatosConsultarPrueba(){
    this.idExaminador = this.consultarPruebaForm.controls['idExaminador'].value;
    this.hojaDeResultadosService.esPermitidoElUsuario(this.idExaminador).subscribe(
      res => {
        this.consultarPrueba();
      }, error => {
        this.mensajeError(error.error.mensaje);
      })
  }

  fechaFinalEsMayor(field: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const group = control.parent;
      const fieldToCompare = group.get(field);
      const laterThan = this.compararFechas(fieldToCompare.value, control.value);
      return laterThan ? { 'invalidDate': { value: control.value } } : null;
    };
  }

  compararFechas(date1: string, date2: string): boolean {
    const dateOne = new Date(date1);
    const dateTwo = new Date(date2);
    return dateOne.getTime() > dateTwo.getTime();
  }

  calcularEdad() {
    const fechaNacimiento = new DatePipe('en-US').transform(this.ingresoDatosForm.controls['fechaNacimiento'].value, 'dd/MM/yyyy');
    const fechaEvaluacion = new DatePipe('en-US').transform(this.ingresoDatosForm.controls['fechaEvaluacion'].value, 'dd/MM/yyyy');
    this.hojaDeResultadosService.obtenerEdadEvaluado(fechaNacimiento, fechaEvaluacion).subscribe(res => {
      this.edad = res;
      this.globals.edad = this.edad.anios;
      this.globals.meses = this.edad.meses;
      this.fechas = true;
    });
  }

  get f() { return this.ingresoDatosForm.controls; }

  edicionDePrueba() {
    this.editarPrueba = true;
    this.globals.datosSeleccionados = false;
  }

  inicializarPrueba() {
    if (this.ingresoDatosForm.valid) {
      this.evaluado.fechaDeNacimiento = this.ingresoDatosForm.controls['fechaNacimiento'].value;
      this.evaluado.id = this.ingresoDatosForm.controls['identificacion'].value;
      this.evaluado.nombreCompleto = this.ingresoDatosForm.controls['nombre'].value;
      this.prueba.edadEvaluado = this.edad;
      this.prueba.evaluado = this.evaluado;
      this.prueba.nombreExaminador = this.ingresoDatosForm.controls['nombreExaminador'].value;
      this.prueba.fechaEvaluacion = this.ingresoDatosForm.controls['fechaEvaluacion'].value;
      this.prueba.tipoPrueba = localStorage.getItem('tipoPrueba');
      this.llenarRamasDelConocimiento();
      this.hojaDeResultadosService.crearPrueba(this.prueba).subscribe(
        res => {
          this.siguiente();
        }, error => {
          this.mensajeError(error.error.mensaje);
          this.router.navigate(['ingreso-de-datos']);
        }
      );
      
    }
  }

  llenarRamasDelConocimiento() {
    this.prueba.ramaDelConocimiento = [];
    this.prueba.ramaDelConocimiento[0] = new RamaDelConocimiento();
    this.prueba.ramaDelConocimiento[1] = new RamaDelConocimiento();
    this.prueba.ramaDelConocimiento[2] = new RamaDelConocimiento();
    this.prueba.ramaDelConocimiento[3] = new RamaDelConocimiento();
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

  siguiente() {
    this.globals.idEvaluado = this.idEvaluado;
    localStorage.setItem('idEvaluado', <string> this.globals.idEvaluado);
    this.globals.mostrarNavBar = true;
    this.router.navigate([this.globals.rutas[0]]);
  }

  mostrarFormularioConsultarPrueba() {
    this.mostrarConsultarPrueba = true;
    this.mostrarCrearPrueba = false;
  }

  mostrarFormularioRealizarPrueba() {
    this.mostrarCrearPrueba = true;
    this.mostrarConsultarPrueba = false;
  }

  consultarPrueba() {   
    this.router.navigate(['/hoja-pruebas']);
  }

  volver(){
    this.router.navigate(['/']);
  }

}
