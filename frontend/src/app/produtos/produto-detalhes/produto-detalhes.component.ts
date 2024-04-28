import { Component, inject } from "@angular/core";
import { ProdutosService } from "../produtos.service";
import { ActivatedRoute } from "@angular/router";
import { Produto } from "../produtos.component";
import { switchMap, tap } from "rxjs";
import { VendasService } from "../../vendas/vendas.service";
import { Venda } from "../../vendas/vendas.component";
import { FormControl, Validators } from "@angular/forms";
import { DataTableField } from "../../shared/data-table/data-table.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoVendaDialogComponent } from "../produto-venda-dialog/produto-venda-dialog.component";
import { ProdutoAtualizacaoDialogComponent } from "../produto-atualizacao/produto-atualizacao-dialog.component";

@Component({
  selector: "produto-detalhes-component",
  templateUrl: "produto-detalhes.component.html",
  styleUrl: "produto-detalhes.component.scss"
})
export class ProdutoDetalhesComponent {
  produtosService = inject(ProdutosService);
  vendasService = inject(VendasService);
  activatedRoute = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  snackBar: MatSnackBar = inject(MatSnackBar);

  pesquisaExpanded: boolean = true;
  controlPesquisa: FormControl = new FormControl(null, [Validators.pattern(/^[1-9]\d*$/)]);
  produto: Produto;
  vendas: Venda[] = [];

  vendasColumns: DataTableField[] = [
    {
      nome: 'id',
      label: 'Id da venda',
      tipoDado: 'number',
    },
    {
      nome: 'comprador',
      label: 'Nome do comprador',
      tipoDado: 'string',
    },
    {
      nome: 'produtoId',
      label: 'Id do produto',
      tipoDado: 'number',
    },
    {
      nome: 'quantidades',
      label: 'Quantidade total',
      tipoDado: 'number',
    },
    {
      nome: 'totalVenda',
      label: 'Valor da venda',
      tipoDado: 'currency',
    },
  ];

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.pesquisarProduto(params["id"]);
        this.controlPesquisa.setValue(params["id"]);
      }
    })
  }

  pesquisarProduto(idProduto: string) {
    this.produtosService.getProduto(Number(idProduto))
      .pipe(tap(produto => this.produto = produto),
        switchMap(produto => this.vendasService
          .getAllVendasByProduct(Number(idProduto))))
      .subscribe({
        next: (vendas) => {
          this.vendas = vendas;
          this.pesquisaExpanded = false;
        },
        error: (err) => {
          this.produto = null;
          this.vendas = [];
          alert(err.error.message);
        }
      })
  }

  efetuarVenda() {
    this.dialog.open(ProdutoVendaDialogComponent, {
      data: { produto: this.produto },
      panelClass: 'produto-venda-dialog'
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.snackBar.open("Venda efetuada com sucesso!", null, { duration: 3000 })
        this.pesquisarProduto(this.produto.id.toString());
      }
    })
  }

  editarProduto() {
    this.dialog.open(ProdutoAtualizacaoDialogComponent, {
      data: { produto: this.produto },
      panelClass: 'produto-atualizacao-dialog'
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.snackBar.open("Produto atualizado com sucesso!", null, { duration: 3000 })
        this.pesquisarProduto(this.produto.id.toString());
      }
    })
  }
}