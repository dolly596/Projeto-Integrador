import { Component, OnInit } from '@angular/core';
import { Ifuncionario } from '../service/ifuncionario';
import { FuncionarioService } from '../service/funcionario.service';
import { ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-funcionario',
  templateUrl: './listarfuncionario.component.html',
  styleUrls: ['./listarfuncionario.component.scss']
})
export class ListarfuncionarioComponent implements OnInit {
  funcionario: Ifuncionario[]=[];
  
  form = new FormGroup({
    id : new FormControl (),
    nome : new FormControl (''),
    cargo : new FormControl(''),
    salario : new FormControl (''),
    areaAtuacao : new FormControl (''),
    localTrabalho : new FormControl
})

  constructor(
    private service: FuncionarioService, 
    private router: Router, 
    private route: ActivatedRoute){ }

  ngOnInit(): void {
     this.Listar();
  }

  Listar(){
     // a minha variavel do tipo cursos está recebendo o json da API
     this.service.listar().subscribe(dados => this.funcionario = dados);
  }

  Editar(id:number){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  Excluir(id:number){
    this.service.excluir(id).subscribe(
      success => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Funcionário excluído com sucesso",
          showConfirmButton: false,
          timer: 2000
        });
        this.service.listar().subscribe(dados => this.funcionario = dados);
      },
      Error => alert("Erro ao excluir o cliente ")
    );
  }
}