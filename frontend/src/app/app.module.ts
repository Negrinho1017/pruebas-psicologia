import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SemejanzasComponent } from './semejanzas/semejanzas.component';
import { AppRoutingModule } from './/app-routing.module';
import { RetencionDigitosComponent } from './retencion-digitos/retencion-digitos.component';
import { MatricesComponent } from './matrices/matrices.component';

@NgModule({
  declarations: [
    AppComponent,
    SemejanzasComponent,
    RetencionDigitosComponent,
    MatricesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
