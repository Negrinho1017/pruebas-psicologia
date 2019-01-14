import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemejanzasComponent } from '../app/wais/semejanzas/semejanzas.component';
import { RetencionDigitosComponent } from '../app/wais/retencion-digitos/retencion-digitos.component';
import { MatricesComponent } from '../app/wais/matrices/matrices.component';
import { VocabularioComponent } from '../app/wais/vocabulario/vocabulario.component';
import { AritmeticaComponent } from '../app/wais/aritmetica/aritmetica.component';
import { BusquedaSimbolosComponent } from '../app/wais/busqueda-simbolos/busqueda-simbolos.component';
import { RompecabezasVisualComponent } from '../app/wais/rompecabezas-visual/rompecabezas-visual.component';
import { InformacionComponent } from '../app/wais/informacion/informacion.component';
import { RouterModule, Routes } from '@angular/router';
import { DisenoCubosComponent } from './wais/diseno-cubos/diseno-cubos.component';
import { ClavesComponent } from './wais/claves/claves.component';
import { NumerosLetrasComponent } from './wais/numeros-letras/numeros-letras.component';
import { HojaDeResultadosComponent } from './wais/hoja-de-resultados/hoja-de-resultados.component';
import { IngresoDeDatosComponent } from './ingreso-de-datos/ingreso-de-datos.component';
import { HojaDePuntuacionesCompuestasComponent } from './wais/hoja-de-puntuaciones-compuestas/hoja-de-puntuaciones-compuestas.component';
import { Globals } from './globals';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { AnalisisComponent } from './wais/analisis/analisis.component';
import { SubpruebasOpcionalesComponent } from './wais/subpruebas-opcionales/subpruebas-opcionales.component';
import { ComprensionComponent } from './wais/comprension/comprension.component';
import { FigurasIncompletasComponent } from './wais/figuras-incompletas/figuras-incompletas.component';
import { PesoFiguradoComponent } from './wais/peso-figurado/peso-figurado.component';
import { CancelacionComponent } from './wais/cancelacion/cancelacion.component';
import { FortalezasDebilidadesComponent } from './wais/fortalezas-debilidades/fortalezas-debilidades.component';
import { AnalisisProcesoComponent } from './wais/analisis-proceso/analisis-proceso.component';
import { AuthGuard } from './AuthGuard';
import { DisenoCubosWiscComponent } from './wisc/diseno-cubos-wisc/diseno-cubos-wisc.component';
import { SemejanzasWiscComponent } from './wisc/semejanzas-wisc/semejanzas-wisc.component';
import { RetencionDigitosWiscComponent } from './wisc/retencion-digitos-wisc/retencion-digitos-wisc.component';
import { ConceptosConDibujosComponent } from './wisc/conceptos-con-dibujos/conceptos-con-dibujos.component';
import { ClavesWiscComponent } from './wisc/claves-wisc/claves-wisc.component';
import { VocabularioWiscComponent } from './wisc/vocabulario-wisc/vocabulario-wisc.component';
import { NumerosLetrasWiscComponent } from './wisc/numeros-letras-wisc/numeros-letras-wisc.component';
import { MatricesWiscComponent } from './wisc/matrices-wisc/matrices-wisc.component';
import { ComprensionWiscComponent } from './wisc/comprension-wisc/comprension-wisc.component';
import { BusquedaSimbolosWiscComponent } from './wisc/busqueda-simbolos-wisc/busqueda-simbolos-wisc.component';
import { FigurasIncompletasWiscComponent } from './wisc/figuras-incompletas-wisc/figuras-incompletas-wisc.component';
import { RegistrosComponent } from './wisc/registros/registros.component';
import { InformacionWiscComponent } from './wisc/informacion-wisc/informacion-wisc.component';
import { AritmeticaWiscComponent } from './wisc/aritmetica-wisc/aritmetica-wisc.component';
import { HojaDeResultadosWiscComponent } from './wisc/hoja-de-resultados-wisc/hoja-de-resultados-wisc.component';
import { PistasComponent } from './wisc/pistas/pistas.component';
import { AnalisisWiscComponent } from './wisc/analisis-wisc/analisis-wisc.component';
import { AnalisisProcesoWiscComponent } from './wisc/analisis-proceso-wisc/analisis-proceso-wisc.component';

const routes: Routes = [
  { path: 'analisis-proceso', component: AnalisisProcesoComponent, canActivate: [AuthGuard] },
  { path: 'analisis-proceso-wisc', component: AnalisisProcesoWiscComponent, canActivate: [AuthGuard] },
  { path: 'fortalezas-debilidades', component: FortalezasDebilidadesComponent, canActivate: [AuthGuard] },
  { path: 'subpruebas-opcionales', component: SubpruebasOpcionalesComponent, canActivate: [AuthGuard] },
  { path: 'ingreso-de-datos', component: IngresoDeDatosComponent },
  { path: 'semejanzas', component: SemejanzasComponent, canActivate: [AuthGuard] }, 
  { path: 'semejanzas-wisc', component: SemejanzasWiscComponent, canActivate: [AuthGuard] }, 
  { path: 'diseno-cubos', component: DisenoCubosComponent, canActivate: [AuthGuard]},
  { path: 'diseno-cubos-wisc', component: DisenoCubosWiscComponent, canActivate: [AuthGuard]},
  { path: 'retencion-digitos', component: RetencionDigitosComponent, canActivate: [AuthGuard] },
  { path: 'retencion-digitos-wisc', component: RetencionDigitosWiscComponent, canActivate: [AuthGuard] },
  { path: 'matrices', component: MatricesComponent, canActivate: [AuthGuard] },
  { path: 'matrices-wisc', component: MatricesWiscComponent, canActivate: [AuthGuard]},
  { path: 'conceptos-con-dibujos', component: ConceptosConDibujosComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'vocabulario', component: VocabularioComponent, canActivate: [AuthGuard] },
  { path: 'vocabulario-wisc', component: VocabularioWiscComponent, canActivate: [AuthGuard] },
  { path: 'aritmetica', component: AritmeticaComponent, canActivate: [AuthGuard] },
  { path: 'aritmetica-wisc', component: AritmeticaWiscComponent, canActivate: [AuthGuard] },
  { path: 'busqueda-simbolos', component: BusquedaSimbolosComponent, canActivate: [AuthGuard] },
  { path: 'busqueda-simbolos-wisc', component: BusquedaSimbolosWiscComponent, canActivate: [AuthGuard] },
  { path: 'rompecabezas-visual', component: RompecabezasVisualComponent, canActivate: [AuthGuard] },
  { path: 'informacion', component: InformacionComponent, canActivate: [AuthGuard] },
  { path: 'informacion-wisc', component: InformacionWiscComponent, canActivate: [AuthGuard] },
  { path: 'claves', component: ClavesComponent, canActivate: [AuthGuard] },
  { path: 'claves-wisc', component: ClavesWiscComponent, canActivate: [AuthGuard] },
  { path: 'hoja-resultados', component: HojaDeResultadosComponent, canActivate: [AuthGuard] },
  { path: 'hoja-resultados-wisc', component: HojaDeResultadosWiscComponent, canActivate: [AuthGuard] },
  { path: 'hoja-puntuaciones-compuestas', component: HojaDePuntuacionesCompuestasComponent, canActivate: [AuthGuard] },
  { path: 'numeros-letras', component: NumerosLetrasComponent, canActivate: [AuthGuard] },
  { path: 'numeros-letras-wisc', component: NumerosLetrasWiscComponent, canActivate: [AuthGuard] },
  { path: 'pagina-principal', component: PaginaPrincipalComponent, canActivate: [AuthGuard] },
  { path: 'analisis', component: AnalisisComponent, canActivate: [AuthGuard] },
  { path: 'analisis-wisc', component: AnalisisWiscComponent, canActivate: [AuthGuard] },
  { path: 'comprension', component: ComprensionComponent, canActivate: [AuthGuard] },
  { path: 'comprension-wisc', component: ComprensionWiscComponent, canActivate: [AuthGuard] },
  { path: 'figuras-incompletas', component: FigurasIncompletasComponent, canActivate: [AuthGuard] },
  { path: 'figuras-incompletas-wisc', component: FigurasIncompletasWiscComponent, canActivate: [AuthGuard] },
  { path: 'peso-figurado', component: PesoFiguradoComponent, canActivate: [AuthGuard] },
  { path: 'cancelacion', component: CancelacionComponent, canActivate: [AuthGuard] },
  { path: 'registros', component: RegistrosComponent, canActivate: [AuthGuard] },
  { path: 'pistas', component: PistasComponent, canActivate: [AuthGuard] },
  { path: '', component: PaginaPrincipalComponent }
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
