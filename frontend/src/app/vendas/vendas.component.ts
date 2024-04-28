import { Component } from '@angular/core';

export interface Venda {
    id: number;
    comprador: string;
    produtoId: number;
    quantidades: number;
    totalVenda: string;
} 

@Component({
  templateUrl: 'vendas.component.html',
  styleUrl: './vendas.component.scss',
})
export class VendasComponent {
}
