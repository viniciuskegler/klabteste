import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PtBrMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'Itens/página:';
  override nextPageLabel: string = 'Próximo';
  override previousPageLabel: string = 'Anterior';
  override firstPageLabel: string = "Primeira Página";
  override lastPageLabel: string = "Ultima Página";

  override getRangeLabel = function (
    page: any,
    pageSize: any,
    length: any
  ): string {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIdx = page * pageSize;
    const endIdx =
      startIdx < length
        ? Math.min(startIdx + pageSize, length)
        : startIdx + pageSize;
    return startIdx + 1 + ' - ' + endIdx + ' / ' + length;
  };
}
