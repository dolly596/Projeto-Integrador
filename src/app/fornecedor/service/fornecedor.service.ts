import { Injectable } from '@angular/core';
import { Ifornecedor } from './ifornecedor';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
   // o readonly serve para dizer que a variável não pode ser alterada
  // A variável API está fazedo a conexão com o backend
  private readonly  API ="http://localhost:8080/fornecedor";

  constructor(private http: HttpClient) { }

  listar(){
    // O atributo <Ifornecedor[]> serve para parametrizar o retorno da classe
    return this.http.get<Ifornecedor[]>(this.API);
  }


  listarPorId(id:object) {
    return this.http.get<Ifornecedor>(`${this.API}/${id}`).pipe(take(1));
  }

  criar(fornecedor:object) {
    // o pipe take 1 serve para ir apenas umas vez no servidor e voltar.
    return this.http.post(this.API, fornecedor).pipe(take(1));
  }

  atualizar(fornecedor:any){
    return this.http.put(`${this.API}/${fornecedor.id}`, fornecedor).pipe(take(1));
  }

  excluir(id:any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
  
}
