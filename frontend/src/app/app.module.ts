import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SemejanzasComponent } from './semejanzas/semejanzas.component';
import { AppRoutingModule } from './/app-routing.module';
import { RetencionDigitosComponent } from './retencion-digitos/retencion-digitos.component';
import { DisenoCubosComponent } from './diseno-cubos/diseno-cubos.component';
import { MatricesComponent } from './matrices/matrices.component';
import { VocabularioComponent } from './vocabulario/vocabulario.component';
import { AritmeticaComponent } from './aritmetica/aritmetica.component';
import { CronometroComponent } from './cronometro/cronometro.component';
import { BusquedaSimbolosComponent } from './busqueda-simbolos/busqueda-simbolos.component';
import { RompecabezasVisualComponent } from './rompecabezas-visual/rompecabezas-visual.component';
import { InformacionComponent } from './informacion/informacion.component';
import { ClavesComponent } from './claves/claves.component';
import { VocabularioService } from './vocabulario/vocabulario.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CalculadoraFechasComponent } from './calculadora-fechas/calculadora-fechas.component'

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
    CalculadoraFechasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [VocabularioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
