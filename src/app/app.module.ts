import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { FormFornecedorComponent } from './fornecedor/form-fornecedor/form-fornecedor.component';
import { FormFuncionarioComponent } from './funcionario/form-funcionario/form-funcionario.component';
import { FormDepartamentoComponent } from './departamento/form-departamento/form-departamento.component';
import { FormProjetoComponent } from './projeto/form-projeto/form-projeto.component';
import { FormEmpresaComponent } from './empresa/form-empresa/form-empresa.component';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    FormClientesComponent,
    FormFornecedorComponent,
    FormFuncionarioComponent,
    FormDepartamentoComponent,
    FormProjetoComponent,
    FormEmpresaComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
