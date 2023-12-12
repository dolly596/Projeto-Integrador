import { Injectable } from '@angular/core';
import { Ifuncionario } from './ifuncionario';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
   // o readonly serve para dizer que a variável não pode ser alterada
  // A variável API está fazedo a conexão com o backend
  private readonly  API ="http://localhost:8080/funcionario";

  constructor(private http: HttpClient) { }

  listar(){
    // O atributo <Icursos[]> serve para parametrizar o retorno da classe
    return this.http.get<Ifuncionario[]>(this.API);
  }


  listarPorId(id:object) {
    return this.http.get<Ifuncionario>(`${this.API}/${id}`).pipe(take(1));
  }

  criar(funcionario:object) {
    // o pipe take 1 serve para ir apenas umas vez no servidor e voltar.
    return this.http.post(this.API, funcionario).pipe(take(1));
  }

  atualizar(funcionario:any){
    return this.http.put(`${this.API}/${funcionario.id}`, funcionario).pipe(take(1));
  }

  excluir(id:any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
  
}
