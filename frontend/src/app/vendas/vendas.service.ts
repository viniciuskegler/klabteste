import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Venda } from './vendas.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  httpClient = inject(HttpClient);

  getAllVendas(): Observable<Venda[]> {
    return this.httpClient.get<Venda[]>(`vendas`);
  }

  getAllVendasByProduct(productId: number): Observable<Venda[]> {
    return this.httpClient.get<Venda[]>(`vendas/produto/${productId}`);
  }

  createVenda(venda: Venda): Observable<any> {
    return this.httpClient.post<Venda>(`vendas`, venda);
  }
}
