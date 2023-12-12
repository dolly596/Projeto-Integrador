
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientesService } from '../service/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import Swal from 'sweetalert2'
import { Iclientes } from '../service/iclientes';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cpf: new FormControl(''),
    rg: new FormControl(''), 
    endereco: new FormControl(''),
    email: new FormControl('')  
  })

constructor(
private service:ClientesService,
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
          title: "Cliente atualizado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['cliente']);
      },
      Error => alert("Erro ao atualizar o cliente ")
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['cliente']);
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

  ).subscribe(cliente => this.atualizarForm(cliente));
}

atualizarForm(cliente: Iclientes){
({
    id: cliente.id,
    nome: cliente.nome,
    cpf: cliente.cpf,   
    Rg: cliente.rg,
    endereco: cliente.endereco,
    email: cliente.email
  });
}


// o comando abaixo refere-se esse formulário recebera o 
  // valor do caminho = valor da URL
  Cancelar() {
    console.log('Cancelado');
    this.form.reset();
    console.log('Formulário resetado');
    this.router.navigate(['/cliente']);
    console.log('Navegação realizada');
  }

}
