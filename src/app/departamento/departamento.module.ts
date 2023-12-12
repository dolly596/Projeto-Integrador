import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { ListardepartamentoComponent } from './listardepartamento/listardepartamento.component';



@NgModule({
  declarations: [
    ListardepartamentoComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
  ]
})
export class DepartamentoModule { }
