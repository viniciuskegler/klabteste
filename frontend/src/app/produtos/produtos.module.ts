import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

const route = [
  { component: ProdutosComponent, path: '' },
  { component: ProdutoDetalhesComponent, path: 'detalhes'}
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
    MatListModule
  ],
  declarations: [ProdutosComponent, ProdutoDetalhesComponent],
  exports: [ProdutosComponent],
  providers: [ProdutosService, VendasService],
})
export class ProdutosModule { }
