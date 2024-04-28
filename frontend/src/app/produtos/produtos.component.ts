import { Component, inject } from "@angular/core";
import { DataTableAction, DataTableFiltro } from "../shared/data-table-filtros/data-table-filtros.component";
import { DataTableField } from "../shared/data-table/data-table.component";
import { ProdutosService } from "./produtos.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ProdutoCadastroDialogComponent } from "./produto-cadastro/produto-cadastro-dialog.component";

export interface Produto {
  id: number;
  nome: string;
  quantidades: number;
  defeitos: number;
  disponivel: number;
  preco: string;
}

@Component({
  selector: "produtos-component",
  templateUrl: "produtos.component.html",
  styleUrl: "produtos.component.scss"
})
export class ProdutosComponent {
  dialog = inject(MatDialog);
  produtosService = inject(ProdutosService);
  router = inject(Router);

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

  produtosActions: DataTableAction[] = [
    {
      label: "Detalhes do produto",
      icon: "info",
      action: (rowInfo) => {
        this.router.navigateByUrl(`/produtos/detalhes?id=${rowInfo["id"]}`);
      }
    }
  ]

  ngOnInit() {
    this.atualizarProdutos();
  }

  atualizarProdutos() {
    this.produtosService.getAllProdutos().subscribe((values) => {
      this.produtosData = values;
    });
  }

  abrirDialogCadastro(event:any) {
    this.dialog.open(ProdutoCadastroDialogComponent, { panelClass: "produto-cadastro-dialog" })
      .afterClosed().subscribe((res) => {
        if (res) {
          this.atualizarProdutos();
        }
      });
    
    //Previne o expansion panel de expandir/colapsar
    event.preventDefault();
    event.stopPropagation();
  }

}
