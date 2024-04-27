import { Component, inject } from "@angular/core";
import { DataTableFiltro } from "../shared/data-table-filtros/data-table-filtros.component";
import { DataTableField } from "../shared/data-table/data-table.component";
import { ProdutosService } from "./produtos.service";

export interface Produto {
  id: number;
  nome: string;
  quantidades: number;
  defeitos: number;
  disponivel: number;
  preco: number;
}

@Component({
  selector: "produtos-component",
  templateUrl: "produtos.component.html",
  styleUrl: "produtos.component.scss"
})
export class ProdutosComponent {
  produtosService = inject(ProdutosService);

  produtosData: Produto[];
  produtoColumns: DataTableField[] = [
    {
      nome: 'nome',
      label: 'Nome do Produto',
      tipoDado: 'string',
    },
    {
      nome: 'quantidades',
      label: 'Quantidade total',
      tipoDado: 'number',
    },
    {
      nome: 'defeitos',
      label: 'Quantidade defeito',
      tipoDado: 'number',
    },
    {
      nome: 'disponivel',
      label: 'Quantidade disponível para venda',
      tipoDado: 'number',
    },
    {
      nome: 'preco',
      label: 'Preço',
      tipoDado: 'currency',
    },
  ];

  produtosFiltros: DataTableFiltro[] = [
    {
      nome: 'preco',
      label: 'Preço',
      tipoFiltro: 'intervalo',
      tipoDado: 'currency'
    },
    {
      nome: 'quantidades',
      label: 'Quantidade total',
      tipoFiltro: 'maior',
      tipoDado: 'number'

    },
    {
      nome: 'nome',
      label: 'Nome',
      tipoFiltro: 'igual',
      tipoDado: 'string'
    },
  ];

  ngOnInit() {
    this.produtosService.getAllProdutos().subscribe((values) => {
      this.produtosData = values;
    });
  }

}
