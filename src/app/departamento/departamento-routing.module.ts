import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListardepartamentoComponent } from './listardepartamento/listardepartamento.component';
import { FormDepartamentoComponent } from './form-departamento/form-departamento.component';

const routes: Routes = [
  {path:"novo", component: FormDepartamentoComponent},
  {path:"editar/:id", component: FormDepartamentoComponent},
  {path:"", component: ListardepartamentoComponent}
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
