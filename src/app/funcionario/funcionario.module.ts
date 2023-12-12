import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { ListarfuncionarioComponent } from './listarfuncionario/listarfuncionario.component';



@NgModule({
  declarations: [
    ListarfuncionarioComponent,
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule
  ]
})
export class FuncionarioModule { }
