
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DeparmentoService } from '../service/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import Swal from 'sweetalert2'
import { Idepartamento } from '../service/idepartamento';

@Component({
  selector: 'app-departamento-form',
  templateUrl:'./form-departamento.component.html',
  styleUrls: ['./form-departamento.component.scss']
})
export class FormDepartamentoComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    localidade: new FormControl(''),
    descricaoAtividades: new FormControl(''), 
    email: new FormControl('')  
  })

constructor(
private service:DeparmentoService,
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
          title: "Departamento atualizado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['departamento']);
      },
      Error => alert("Erro ao atualizar o departamento ")
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Departamento cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['departamento']);
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

  ).subscribe(departamento => this.atualizarForm(departamento));
}

atualizarForm(departamento: Idepartamento){
({
    id: departamento.id,
    nome: departamento.nome,
    localidade: departamento.localidade,   
    descricaoAtividades: departamento.descricaoAtividades,
    email: departamento.email
  });
}


// o comando abaixo refere-se esse formulário recebera o 
  // valor do caminho = valor da URL
  Cancelar() {
    console.log('Cancelado');
    this.form.reset();
    console.log('Formulário resetado');
    this.router.navigate(['/departamento']);
    console.log('Navegação realizada');
  }

}
