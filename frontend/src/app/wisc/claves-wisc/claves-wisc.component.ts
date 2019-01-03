import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { PuntuacionEscalarService } from 'src/app/puntuacion-escalar/puntuacion-escalar.service';
import { HojaDeResultadosService } from 'src/app/wais/hoja-de-resultados/hoja-de-resultados.service';
import { Subprueba } from 'src/app/model/Subprueba';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claves-wisc',
  templateUrl: './claves-wisc.component.html',
  styleUrls: ['./claves-wisc.component.css']
})
export class ClavesWiscComponent implements OnInit {
  puntuacion: number = 0;
  tiposPrueba: String[] = ["A","B"];
  rangoEdades: String[] = ["6 - 7","8 - 16"];
  subprueba: Subprueba = new Subprueba();
  seCambiaraLaSubprueba: boolean = false;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.subprueba.numeroSubprueba = 5;
    this.subprueba.nombre = "Claves";
  }

  finalizarSubprueba(){
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarClaves(this.globals.edad,this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.globals.clavesNatural = this.subprueba.puntuacionNatural;
      this.globals.claves = this.subprueba.puntuacionEscalar;
      this.router.navigate([this.globals.rutas[5]]);
      this.scrollToTop();
    }, error => {
      this.mensajeError(error.error.mensaje);
      this.scrollToTop();
    });
    
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  cambiarSubprueba(){
    if(this.globals.subpruebas[6]=="Cancelación"){
      this.mensajeError("Cancelación ya fué realizada");
    }else{
      this.globals.rutas[9]="/cancelacion";
      this.globals.subpruebas[9] = "Cancelación";
      this.router.navigate([this.globals.rutas[9]]);
    }  
  }

  mensajeError(mensaje: string) {
    swal({
      title: 'Error!',
      icon: "error",
      text: mensaje,
    });
  }

}
