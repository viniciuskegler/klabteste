import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { ProdutosService } from "../produtos.service";
import { ActivatedRoute } from "@angular/router";
import { Produto } from "../produtos.component";
import { switchMap, tap } from "rxjs";
import { VendasService } from "../../vendas/vendas.service";
import { Venda } from "../../vendas/vendas.component";
import { FormControl, Validators } from "@angular/forms";
import { DataTableField } from "../../shared/data-table/data-table.component";

@Component({
  selector: "produto-detalhes-component",
  templateUrl: "produto-detalhes.component.html",
  styleUrl: "produto-detalhes.component.scss"
})
export class ProdutoDetalhesComponent {
  produtosService = inject(ProdutosService);
  vendasService = inject(VendasService);
  activatedRoute = inject(ActivatedRoute);
  changeDetectorRef = inject(ChangeDetectorRef);

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
      if(params["id"]) {
        this.pesquisarProduto(params["id"]);
        this.controlPesquisa.setValue(params["id"]);
      }
    })
  }

  pesquisarProduto(idProduto: string) {
    this.produtosService.getProduto(Number(idProduto))
      .pipe(tap(produto => this.produto = produto),
        switchMap(produto => this.vendasService.getAllVendasByProduct(Number(idProduto))))
      .subscribe((vendas) => {
        this.vendas = vendas;
        this.pesquisaExpanded = false;
        this.changeDetectorRef.markForCheck();
      })
  }
}
