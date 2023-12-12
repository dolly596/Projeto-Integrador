
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FornecedorService } from '../service/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import Swal from 'sweetalert2'
import { Ifornecedor } from '../service/ifornecedor';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './form-fornecedor.component.html',
  styleUrls: ['./form-fornecedor.component.scss']
})
export class FormFornecedorComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cnpj: new FormControl(''),
    ie: new FormControl(''), 
    endereco: new FormControl(''),
    email: new FormControl('')  
  })

constructor(
private service:FornecedorService,
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
          title: "Fornecedor atualizado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['fornecedor']);
      },
      Error => alert("Erro ao atualizar o Fornecedor ")
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Fornecedor cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['fornecedor']);
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

  ).subscribe(fornecedor => this.atualizarForm(fornecedor));
}

atualizarForm(fornecedor: Ifornecedor){
({
    id: fornecedor.id,
    nome: fornecedor.nome,
    cnpj: fornecedor.cnpj,   
    ie: fornecedor.ie,
    endereco: fornecedor.endereco,
    email: fornecedor.email
  });
}


// o comando abaixo refere-se esse formulário recebera o 
  // valor do caminho = valor da URL
  Cancelar() {
    console.log('Cancelado');
    this.form.reset();
    console.log('Formulário resetado');
    this.router.navigate(['/fornecedor']);
    console.log('Navegação realizada');
  }

}
