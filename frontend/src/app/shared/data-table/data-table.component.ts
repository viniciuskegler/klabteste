import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Sort, MatSortModule, MatSort } from '@angular/material/sort';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import {
  DataTableFiltro,
  DataTableFiltrosComponent,
} from '../data-table-filtros/data-table-filtros.component';
import { MatIconModule } from '@angular/material/icon';
import { PtBrMatPaginatorIntl } from '../ptbr-mat-paginator-intl';

export interface DataTableField {
  nome: string;
  label: string;
  tipoDado: DataTableTipoDado;
}

export type DataTableTipoDado = 'string' | 'number' | 'currency';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    DataTableFiltrosComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  @Input() filtros: DataTableFiltro[];

  @Input() set columns(columns: DataTableField[]) {
    this._columns = columns;
    this.columnsNames = columns.map((c) => c.nome);
  }

  get columns(): DataTableField[] {
    return this._columns;
  }

  columnsNames: string[];
  private _columns: DataTableField[];

  @Input() set data(data: any[]) {
    this._data = data;
    this.dataLength = data.length;
    this.shownData = data ? data.slice(0, this.pageSize) : [];
  }

  get data(): any[] {
    return this._data;
  }

  private _data: any[];
  filteredData: any[];
  shownData: any[];
  pageSize: number = 10;
  currentPage: number = 0;
  sortDirection: string = '';
  sortField: string = '';
  dataLength: number = 0;

  keyOrderOriginal = (): number => 0;

  handleTableChange(sortEvent?: Sort, pageEvent?: PageEvent) {
    let data: any[] = this.filteredData
      ? this.filteredData.slice()
      : this.data.slice();
    if (sortEvent) {
      this.updateSortParams(sortEvent);
    }
    if (pageEvent) {
      this.updatePageParams(pageEvent);
    }

    if (this.sortDirection !== '') {
      data.sort((a, b) => {
        let sort: number;
        if (a[this.sortField] < b[this.sortField]) {
          sort = -1;
        } else if (a[this.sortField] > b[this.sortField]) {
          sort = 1;
        } else {
          sort = 0;
        }
        return this.sortDirection === 'asc' ? sort : -sort;
      });
    }
    data = this.getCurrentPageData(data);
    this.updateTableData(data);
  }

  getCurrentPageData(data: any[]) {
    let startIdx: number =
      this.currentPage === 0 ? 0 : this.currentPage * this.pageSize;
    let endIdx: number =
      this.currentPage === 0
        ? this.pageSize
        : this.pageSize * (this.currentPage + 1);
    return data.slice(startIdx, endIdx);
  }

  updateSortParams(sortEvent: Sort) {
    this.sortDirection = sortEvent.direction;
    this.sortField = sortEvent.active;
  }

  updatePageParams(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex;
  }

  updateTableData(data: any[]) {
    //Setar vazio reseta as views da table;
    this.table.dataSource = [];
    this.table.dataSource = data;
  }

  filtrarTabela(valores: Record<string, any>) {
    let data: any[] = this.data.slice();
    for (const filtro of Object.keys(valores)) {
      let filtroAtual: DataTableFiltro = this.filtros.find(
        (f) => f.nome === filtro.replace('Min', '').replace('Max', '')
      );
      if (!filtroAtual || !valores[filtro]) {
        continue;
      }
      switch (filtroAtual.tipoFiltro) {
        case 'igual': {
          let valorfiltro: string = String(valores[filtro]);
          //TODO: Comparar numeros tambem;
          data = data.filter((d) => d[filtroAtual.nome].toUpperCase().includes(valorfiltro.toUpperCase()));
          continue;
        }
        case 'maior': {
          let valorfiltro: number = Number(valores[filtro]);
          data = data.filter((d) => valorfiltro < d[filtroAtual.nome]);
          continue;
        }
        case 'menor': {
          let valorfiltro: number = Number(valores[filtro]);
          data = data.filter((d) => valorfiltro > d[filtroAtual.nome]);
          continue;
        }
        case 'intervalo': {
          let valorfiltro: number = Number(valores[filtro]);
          if (filtro.endsWith('Min')) {
            data = data.filter((d) => valorfiltro < d[filtroAtual.nome]);
          } else {
            data = data.filter((d) => valorfiltro > d[filtroAtual.nome]);
          }
          continue;
        }
      }
    }
    this.dataLength = data.length;
    this.filteredData = data;
    this.handleTableChange();
  }
}
