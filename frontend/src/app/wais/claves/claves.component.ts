import { Component, OnInit } from '@angular/core';
import { Subprueba } from '../../model/Subprueba';
import { Router } from '@angular/router';
import { Globals } from '../../globals';
import { HojaDeResultadosService } from '../hoja-de-resultados/hoja-de-resultados.service';
import { PuntuacionEscalarService } from '../../puntuacion-escalar/puntuacion-escalar.service';

@Component({
  selector: 'app-claves',
  templateUrl: './claves.component.html',
  styleUrls: ['./claves.component.css']
})
export class ClavesComponent implements OnInit {
  puntuacion: number = 0;
  subprueba: Subprueba = new Subprueba();
  seCambiaraLaSubprueba: boolean = false;
  constructor( private globals: Globals, private hojaDeResultadosService: HojaDeResultadosService,
    private router: Router, private puntuacionEscalarService: PuntuacionEscalarService ) { }

  ngOnInit() {
    this.subprueba.numeroSubprueba = 10;
    this.subprueba.nombre = "Claves";
  }

  finalizarSubprueba(){
    this.subprueba.puntuacionNatural = this.puntuacion;
    this.puntuacionEscalarService.obtenerPuntuacionEscalarClaves(this.globals.edad,this.subprueba.puntuacionNatural)
    .subscribe(res => {
      this.subprueba.puntuacionEscalar = res;
      this.hojaDeResultadosService.crearSubprueba(this.subprueba, this.globals.idEvaluado);
      this.globals.ultimaSubprueba = this.subprueba;
      this.globals.clavesNatural = this.subprueba.puntuacionNatural;
      this.globals.claves = this.subprueba.puntuacionEscalar;
      this.router.navigate(['/hoja-resultados']);
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
