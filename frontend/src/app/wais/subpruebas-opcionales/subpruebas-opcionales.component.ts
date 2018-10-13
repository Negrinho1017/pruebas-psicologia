import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-subpruebas-opcionales',
  templateUrl: './subpruebas-opcionales.component.html',
  styleUrls: ['./subpruebas-opcionales.component.css']
})
export class SubpruebasOpcionalesComponent implements OnInit {
  listaSubpruebas: String[] = ["Diseños de cubos", "Semejanzas","Retención de dígitos","Matrices","Vocabulario",
  "Aritmética","Búsqueda de símbolos","Rompecabezas visual","Información","Claves","Sucesión de números y letras",
  "Peso figurado","Comprensión","Cancelación","Figuras incompletas"];
  pruebasAEvaluar: boolean[] = [true,true,true,true,true,true,true,true,true,true,false,false,false,false,false];
  contadorCV: number = 0;
  contadorRP: number = 0;
  contadorMT: number = 0;
  contadorVP: number = 0;
  cambiosGuardados: boolean = false;
  constructor( private globals: Globals ) { }
  
  ngOnInit() {
  }

  seleccionarSubprueba(i: number){
    let variable = <HTMLInputElement>document.getElementById("pruebacheck"+i);
    this.pruebasAEvaluar[i] = variable.checked;
  }

  guardarCambios(){
    if(this.contarCV() && this.contarRP() && this.contarMT() && this.contarVP()){
      this.mensajeExito("Cambios guardados correctamente")
      this.cambiosGuardados = true;
      this.globals.datosSeleccionados = true;
      this.cambiarRutas();
    } else{
      this.pruebasAEvaluar= [true,true,true,true,true,true,true,true,true,true,false,false,false,false,false];
      this.cambiosGuardados = false;
    }
  }

  contarCV(): boolean{
    if(this.pruebasAEvaluar[1]) this.contadorCV++;
    if(this.pruebasAEvaluar[4]) this.contadorCV++;
    if(this.pruebasAEvaluar[8]) this.contadorCV++;
    if(this.pruebasAEvaluar[12]) this.contadorCV++;
    if(this.contadorCV != 3) {
      this.mensajeError("Cantidad de pruebas seleccionadas para comprensión verbal incorrectas");
      this.contadorCV = 0;
      return false;
    }  
    this.contadorCV = 0;
    return true; 
  }

  contarRP(): boolean{
    if(this.pruebasAEvaluar[0]) this.contadorRP++;
    if(this.pruebasAEvaluar[3]) this.contadorRP++;
    if(this.pruebasAEvaluar[7]) this.contadorRP++;
    if(this.pruebasAEvaluar[11]) this.contadorRP++;
    if(this.pruebasAEvaluar[14]) this.contadorRP++;
    if(this.contadorRP != 3){
      this.mensajeError("Cantidad de pruebas seleccionadas para razonamiento perceptual incorrectas");
      this.contadorRP = 0;
      return false;
    }
    this.contadorRP = 0;
    return true;
  }

  contarMT(): boolean{
    if(this.pruebasAEvaluar[2]) this.contadorMT++;
    if(this.pruebasAEvaluar[5]) this.contadorMT++;
    if(this.pruebasAEvaluar[10]) this.contadorMT++;
    if(this.contadorMT != 2){
      this.mensajeError("Cantidad de pruebas seleccionadas para memoria de trabajo incorrectas");
      this.contadorMT = 0;
      return false;
    } 
    this.contadorMT = 0;
    return true;
  }

  contarVP(): boolean{
    if(this.pruebasAEvaluar[6]) this.contadorVP++;
    if(this.pruebasAEvaluar[9]) this.contadorVP++;
    if(this.pruebasAEvaluar[13]) this.contadorVP++;
    if(this.contadorVP != 2){
      this.mensajeError("Cantidad de pruebas seleccionadas para velocidad de procesamiento incorrectas");
      this.contadorVP = 0;
      return false;
    } 
    this.contadorVP = 0;
    return true;
  }

  cambiarRutas(){
    var i = 0;
    for (let vaSerEvaluada of this.pruebasAEvaluar) {
      if(!vaSerEvaluada && (i==2 || i==5)){
        this.cambiarRuta(i);
      }
      i++;
    } 
  }
  
  cambiarRuta(posicion: number){
    if(!this.pruebasAEvaluar[posicion]){
      this.globals.rutas[posicion]="/numeros-letras"
    }
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
}
