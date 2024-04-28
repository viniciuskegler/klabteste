import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutosComponent } from './produtos.component';
import { MatCardModule } from '@angular/material/card';
import { DataTableComponent } from '../shared/data-table/data-table.component';
import { HttpserviceModule } from '../modules/httpservice.module';
import { ProdutosService } from './produtos.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProdutoDetalhesComponent } from './produto-detalhes/produto-detalhes.component';
import { VendasService } from '../vendas/vendas.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProdutoVendaDialogComponent } from './produto-venda-dialog/produto-venda-dialog.component';
import { ProdutoAtualizacaoDialogComponent } from './produto-atualizacao/produto-atualizacao-dialog.component';
import { ProdutoCadastroDialogComponent } from './produto-cadastro/produto-cadastro-dialog.component';

const route = [
  { component: ProdutosComponent, path: '' },
  { component: ProdutoDetalhesComponent, path: 'detalhes' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpserviceModule,
    DataTableComponent,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [ProdutosComponent,
    ProdutoDetalhesComponent,
    ProdutoVendaDialogComponent,
    ProdutoAtualizacaoDialogComponent,
    ProdutoCadastroDialogComponent],
  exports: [ProdutosComponent],
  providers: [ProdutosService, VendasService, CurrencyPipe],
})
export class ProdutosModule { }
