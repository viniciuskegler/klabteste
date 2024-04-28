import { Component, OnInit, inject } from '@angular/core';
import { DataTableField } from '../shared/data-table/data-table.component';
import { VendasService } from './vendas.service';
import { Router } from '@angular/router';

export interface Venda {
    id: number;
    comprador: string;
    produtoId: number;
    quantidades: number;
    totalVenda: string;
}

@Component({
    selector: "vendas-component",
    templateUrl: 'vendas.component.html',
    styleUrl: './vendas.component.scss',
})
export class VendasComponent implements OnInit {
    vendasService = inject(VendasService);
    router = inject(Router);
    vendasData: Venda[];
    vendaColumns: DataTableField[] = [
        {
            nome: 'id',
            label: 'Id',
            tipoDado: 'string',
        },
        {
            nome: 'comprador',
            label: 'Comprador',
            tipoDado: 'string',
        },
        {
            nome: 'produtoId',
            label: 'Id do produto',
            tipoDado: 'number',
        },
        {
            nome: 'quantidades',
            label: 'Quantidade Vendida',
            tipoDado: 'number',
        },
        {
            nome: 'totalVenda',
            label: 'Total da Venda',
            tipoDado: 'currency',
        },
    ];

    ngOnInit(): void {
        this.vendasService.getAllVendas().subscribe({
            next: vendas => this.vendasData = vendas,
            error: err => alert(err.error.message)
        })
    }
}
