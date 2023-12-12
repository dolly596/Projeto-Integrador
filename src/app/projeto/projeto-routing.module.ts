import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarprojetoComponent } from './listarprojeto/listarprojeto.component';
import { FormProjetoComponent } from './form-projeto/form-projeto.component';

const routes: Routes = [
{path:"novo", component: FormProjetoComponent},
{path:"editar/:id", component: FormProjetoComponent},
{path:"", component: ListarprojetoComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }
