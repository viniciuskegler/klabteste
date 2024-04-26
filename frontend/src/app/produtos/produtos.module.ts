import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutosComponent } from './produtos.component';
import { MatCardModule } from '@angular/material/card';
import { DataTableComponent } from '../shared/data-table/data-table.component';
import { HttpserviceModule } from '../modules/httpservice.module';
import { ProdutosService } from './produtos.service';
import { MatExpansionModule } from '@angular/material/expansion';

const route = [{ component: ProdutosComponent, path: '' }];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpserviceModule,
    DataTableComponent,
    MatCardModule,
    MatExpansionModule,
  ],
  declarations: [ProdutosComponent],
  exports: [ProdutosComponent],
  providers: [ProdutosService],
})
export class ProdutosModule {}
