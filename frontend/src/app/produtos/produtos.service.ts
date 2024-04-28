import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Produto } from './produtos.component';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  httpClient = inject(HttpClient);

  getAllProdutos(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>('produtos').pipe(
      tap((prods) => {
        prods.map((p) => (p.disponivel = p.defeitos ? p.quantidades - p.defeitos : p.quantidades));
      })
    );
  }

  getProduto(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`produtos/${id}`).pipe(
      tap((prod) => prod.disponivel = prod.defeitos ? prod.quantidades - prod.defeitos : prod.quantidades)
    );
  }
}
