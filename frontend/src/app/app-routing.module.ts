import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemejanzasComponent } from '../app/semejanzas/semejanzas.component'
import { RetencionDigitosComponent } from '../app/retencion-digitos/retencion-digitos.component'
import { MatricesComponent } from '../app/matrices/matrices.component'
import { VocabularioComponent } from '../app/vocabulario/vocabulario.component'
import { AritmeticaComponent } from '../app/aritmetica/aritmetica.component'
import { BusquedaSimbolosComponent } from '../app/busqueda-simbolos/busqueda-simbolos.component'
import { RompecabezasVisualComponent } from '../app/rompecabezas-visual/rompecabezas-visual.component'
import { InformacionComponent } from '../app/informacion/informacion.component'
import { RouterModule, Routes } from '@angular/router';
import { DisenoCubosComponent } from './diseno-cubos/diseno-cubos.component';

const routes: Routes =[
  { path: 'semejanzas', component: SemejanzasComponent }, 
  { path: 'diseno-cubos', component: DisenoCubosComponent},
  { path: 'retencion-digitos', component: RetencionDigitosComponent },
  { path: 'matrices', component: MatricesComponent },
  { path: 'vocabulario', component: VocabularioComponent },
  { path: 'aritmetica', component: AritmeticaComponent },
  { path: 'busqueda-simbolos', component: BusquedaSimbolosComponent },
  { path: 'rompecabezas-visual', component: RompecabezasVisualComponent },
  { path: 'informacion', component: InformacionComponent }
]

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
