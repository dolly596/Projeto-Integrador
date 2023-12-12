
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FuncionarioService } from '../service/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import Swal from 'sweetalert2'
import { Ifuncionario } from '../service/ifuncionario';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './form-funcionario.component.html',
  styleUrls: ['./form-funcionario.component.scss']
})
export class FormFuncionarioComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cargo: new FormControl(''),
    areaAtuacao: new FormControl(''), 
    salario: new FormControl(''),
    localTrabalho: new FormControl('')  
  })

constructor(
private service:FuncionarioService,
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
          title: "Funcionário atualizado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['funcionario']);
      },
      Error => alert("Erro ao atualizar o funcionario ")
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Funcionário cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['funcionario']);
      },
      Error =>  Swal.fire({
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

  ).subscribe(funcionario => this.atualizarForm(funcionario));
}

atualizarForm(funcionario: Ifuncionario){
({
    id: funcionario.id,
    nome: funcionario.nome,
    cargo: funcionario.cargo,   
    salario: funcionario.salario,
    areaAtuacao: funcionario.areaAtuacao,
    localTrabalho: funcionario.localTrabalho
  });
}


// o comando abaixo refere-se esse formulário recebera o 
  // valor do caminho = valor da URL
  Cancelar() {
    console.log('Cancelado');
    this.form.reset();
    console.log('Formulário resetado');
    this.router.navigate(['/funcionario']);
    console.log('Navegação realizada');
  }

}
