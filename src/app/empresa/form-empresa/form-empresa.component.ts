
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmpresaService } from '../service/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import Swal from 'sweetalert2'
import { Iempresa } from '../service/iempresa';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.scss']
})
export class FormEmpresaComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cnpj: new FormControl(''),
    endereco: new FormControl(''), 
    socios: new FormControl(''),
    faturamento: new FormControl()  
  })

constructor(
private service:EmpresaService,
private route:ActivatedRoute,
private router: Router

){ }

ngOnInit(){ this.ListarPorId(); }

Salvar() {
  if(this.form.value.id){
    this.service.atualizar(this.form.value).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Empresa atualizada com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['empresa']);
      },
      Error => alert("Erro ao atualizar a empresa ")
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Empresa cadastrada com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['empresa']);
      },
      Error => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Alguns campos se encontram vazios ou incorretos!",
        footer: '<a href="#">Verifique novamente!</a>'
      })
    );
  }

  this.form.reset();

}

ListarPorId(){
  // essa função captura os parametros da rota. captura o valor da rota, seja ele nulo 
  // ou não e adiciona o parametro capturado no formulário através da função atualizarForm
  // o Pipe garante que será feita uma requisição no servidor e essa requisição será finalizada.
  // O subscribe inscreve / executa a função.
  this.route.params
  .pipe(
    map((params: any) => params['id']),
    switchMap(id => this.service.listarPorId(id))

  ).subscribe(empresa => this.atualizarForm(empresa));
}

atualizarForm(empresa: Iempresa){
({
    id: empresa.id,
    nome: empresa.nome,
    cnpj: empresa.cnpj,   
    endereco: empresa.endereco,
    socios: empresa.socios,
    faturamento: empresa.faturamento
  });
}


// o comando abaixo refere-se esse formulário recebera o 
  // valor do caminho = valor da URL
  Cancelar() {
    console.log('Cancelado');
    this.form.reset();
    console.log('Formulário resetado');
    this.router.navigate(['/empresa']);
    console.log('Navegação realizada');
  }

}
