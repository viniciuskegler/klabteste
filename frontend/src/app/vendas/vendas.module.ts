import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DataTableComponent } from '../shared/data-table/data-table.component';
import { HttpserviceModule } from '../modules/httpservice.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { VendasComponent } from './vendas.component';
import { VendasService } from './vendas.service';

const route = [
  { component: VendasComponent, path: '' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpserviceModule,
    DataTableComponent,
    MatCardModule,
    MatExpansionModule
  ],
  declarations: [VendasComponent],
  providers: [VendasService]
})
export class VendasModule { }