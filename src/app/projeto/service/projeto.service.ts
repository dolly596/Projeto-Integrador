import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { Iprojeto } from './iprojeto';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
   // o readonly serve para dizer que a variável não pode ser alterada
  // A variável API está fazedo a conexão com o backend
  private readonly  API ="http://localhost:8080/projeto";

  constructor(private http: HttpClient) { }

  listar(){
    // O atributo <Icursos[]> serve para parametrizar o retorno da classe
    return this.http.get<Iprojeto[]>(this.API);
  }


  listarPorId(id:object) {
    return this.http.get<Iprojeto>(`${this.API}/${id}`).pipe(take(1));
  }

  criar(projeto:object) {
    // o pipe take 1 serve para ir apenas umas vez no servidor e voltar.
    return this.http.post(this.API, projeto).pipe(take(1));
  }

  atualizar(projeto:any){
    return this.http.put(`${this.API}/${projeto.id}`, projeto).pipe(take(1));
  }

  excluir(id:any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
  
}
