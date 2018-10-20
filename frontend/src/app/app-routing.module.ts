import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemejanzasComponent } from '../app/wais/semejanzas/semejanzas.component'
import { RetencionDigitosComponent } from '../app/wais/retencion-digitos/retencion-digitos.component'
import { MatricesComponent } from '../app/wais/matrices/matrices.component'
import { VocabularioComponent } from '../app/wais/vocabulario/vocabulario.component'
import { AritmeticaComponent } from '../app/wais/aritmetica/aritmetica.component'
import { BusquedaSimbolosComponent } from '../app/wais/busqueda-simbolos/busqueda-simbolos.component'
import { RompecabezasVisualComponent } from '../app/wais/rompecabezas-visual/rompecabezas-visual.component'
import { InformacionComponent } from '../app/wais/informacion/informacion.component'
import { RouterModule, Routes } from '@angular/router';
import { DisenoCubosComponent } from './wais/diseno-cubos/diseno-cubos.component';
import { ClavesComponent } from './wais/claves/claves.component'
import { NumerosLetrasComponent } from './wais/numeros-letras/numeros-letras.component'
import { HojaDeResultadosComponent } from './wais/hoja-de-resultados/hoja-de-resultados.component'
import { IngresoDeDatosComponent } from './ingreso-de-datos/ingreso-de-datos.component'
import { HojaDePuntuacionesCompuestasComponent } from './wais/hoja-de-puntuaciones-compuestas/hoja-de-puntuaciones-compuestas.component'
import { Globals } from './globals';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { AnalisisComponent } from './wais/analisis/analisis.component'
import { SubpruebasOpcionalesComponent } from './wais/subpruebas-opcionales/subpruebas-opcionales.component'
import { ComprensionComponent } from './wais/comprension/comprension.component';
import { FigurasIncompletasComponent } from './wais/figuras-incompletas/figuras-incompletas.component';
import { PesoFiguradoComponent } from './wais/peso-figurado/peso-figurado.component';
import { CancelacionComponent } from './wais/cancelacion/cancelacion.component';
import { FortalezasDebilidadesComponent } from './wais/fortalezas-debilidades/fortalezas-debilidades.component'

const routes: Routes =[
  //{ path: 'semejanzas/:idEvaluado', component: SemejanzasComponent }, 
  { path: 'fortalezas-debilidades', component: FortalezasDebilidadesComponent },
  { path: 'subpruebas-opcionales', component: SubpruebasOpcionalesComponent },
  { path: 'ingreso-de-datos', component: IngresoDeDatosComponent },
  { path: 'semejanzas', component: SemejanzasComponent }, 
  { path: 'diseno-cubos', component: DisenoCubosComponent},
  { path: 'retencion-digitos', component: RetencionDigitosComponent },
  { path: 'matrices', component: MatricesComponent },
  { path: 'vocabulario', component: VocabularioComponent },
  { path: 'aritmetica', component: AritmeticaComponent },
  { path: 'busqueda-simbolos', component: BusquedaSimbolosComponent },
  { path: 'rompecabezas-visual', component: RompecabezasVisualComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'claves', component: ClavesComponent },
  { path: 'hoja-resultados', component: HojaDeResultadosComponent },
  { path: 'hoja-puntuaciones-compuestas', component: HojaDePuntuacionesCompuestasComponent },
  { path: 'numeros-letras', component: NumerosLetrasComponent },
  { path: 'pagina-principal', component: PaginaPrincipalComponent },
  { path: 'analisis', component: AnalisisComponent },
  { path: 'comprension', component: ComprensionComponent },
  { path: 'figuras-incompletas', component: FigurasIncompletasComponent },
  { path: 'peso-figurado', component: PesoFiguradoComponent },
  { path: 'cancelacion', component: CancelacionComponent }
]

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [ Globals ]
})
export class AppRoutingModule { }
