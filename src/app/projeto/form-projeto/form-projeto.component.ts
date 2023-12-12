
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjetoService } from '../service/projeto.service';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Iprojeto } from '../service/iprojeto';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './form-projeto.component.html',
  styleUrls: ['./form-projeto.component.scss']
})
export class FormProjetoComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    descricao: new FormControl(''),
    qtdeparticipantes: new FormControl(), 
    responsavel: new FormControl(''),
    custo: new FormControl()  
  })

constructor(
private service:ProjetoService,
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
          title: "Projeto atualizado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['projeto']);
      },
      Error => alert("Erro ao atualizar o projeto ")
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Projeto cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['projeto']);
      },
      Error => alert("Erro ao cadastrar o projeto ")
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

  ).subscribe(projeto => this.atualizarForm(projeto));
}

atualizarForm(projeto: Iprojeto){
({
    id: projeto.id,
    nome: projeto.nome,  
    descricao: projeto.descricao,
    qtdeparticipantes: projeto.qtdeparticipantes,
    responsavel: projeto.responsavel, 
    custo: projeto.custo
  });
}


// o comando abaixo refere-se esse formulário recebera o 
  // valor do caminho = valor da URL
  Cancelar() {
    console.log('Cancelado');
    this.form.reset();
    console.log('Formulário resetado');
    this.router.navigate(['/projeto']);
    console.log('Navegação realizada');
  }

}
