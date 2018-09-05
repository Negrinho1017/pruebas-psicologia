import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemejanzasComponent } from '../app/semejanzas/semejanzas.component'
import { RetencionDigitosComponent } from '../app/retencion-digitos/retencion-digitos.component'
import { MatricesComponent } from '../app/matrices/matrices.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  { path: 'semejanzas', component: SemejanzasComponent },
  { path: 'retencion-digitos', component: RetencionDigitosComponent },
  { path: 'matrices', component: MatricesComponent }
]

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
