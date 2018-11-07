import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SemejanzasComponent } from './wais/semejanzas/semejanzas.component';
import { AppRoutingModule } from './/app-routing.module';
import { RetencionDigitosComponent } from './wais/retencion-digitos/retencion-digitos.component';
import { DisenoCubosComponent } from './wais/diseno-cubos/diseno-cubos.component';
import { MatricesComponent } from './wais/matrices/matrices.component';
import { VocabularioComponent } from './wais/vocabulario/vocabulario.component';
import { AritmeticaComponent } from './wais/aritmetica/aritmetica.component';
import { CronometroComponent } from './cronometro/cronometro.component';
import { BusquedaSimbolosComponent } from './wais/busqueda-simbolos/busqueda-simbolos.component';
import { RompecabezasVisualComponent } from './wais/rompecabezas-visual/rompecabezas-visual.component';
import { InformacionComponent } from './wais/informacion/informacion.component';
import { ClavesComponent } from './wais/claves/claves.component';
import { VocabularioService } from './wais/vocabulario/vocabulario.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HojaDeResultadosComponent } from './wais/hoja-de-resultados/hoja-de-resultados.component';
import { ChartModule } from 'angular-highcharts';
import { IngresoDeDatosComponent } from './ingreso-de-datos/ingreso-de-datos.component';
import { HojaDePuntuacionesCompuestasComponent } from './wais/hoja-de-puntuaciones-compuestas/hoja-de-puntuaciones-compuestas.component';
import { NumerosLetrasComponent } from './wais/numeros-letras/numeros-letras.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { AnalisisComponent } from './wais/analisis/analisis.component';
import { SubpruebasOpcionalesComponent } from './wais/subpruebas-opcionales/subpruebas-opcionales.component';
import { ComprensionComponent } from './wais/comprension/comprension.component';
import { FigurasIncompletasComponent } from './wais/figuras-incompletas/figuras-incompletas.component';
import { PesoFiguradoComponent } from './wais/peso-figurado/peso-figurado.component';
import { CancelacionComponent } from './wais/cancelacion/cancelacion.component';
import { FortalezasDebilidadesComponent } from './wais/fortalezas-debilidades/fortalezas-debilidades.component';
import { AnalisisProcesoComponent } from './wais/analisis-proceso/analisis-proceso.component';

@NgModule({
  declarations: [
    AppComponent,
    SemejanzasComponent,
    RetencionDigitosComponent,
    DisenoCubosComponent,
    MatricesComponent,
    VocabularioComponent,
    AritmeticaComponent,
    CronometroComponent,
    BusquedaSimbolosComponent,
    RompecabezasVisualComponent,
    InformacionComponent,
    ClavesComponent,
    HojaDeResultadosComponent,
    IngresoDeDatosComponent,
    HojaDePuntuacionesCompuestasComponent,
    NumerosLetrasComponent,
    PaginaPrincipalComponent,
    AnalisisComponent,
    SubpruebasOpcionalesComponent,
    ComprensionComponent,
    FigurasIncompletasComponent,
    PesoFiguradoComponent,
    CancelacionComponent,
    FortalezasDebilidadesComponent,
    AnalisisProcesoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ChartModule,
    ReactiveFormsModule
  ],
  providers: [VocabularioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
