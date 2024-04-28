import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DataTableTipoDado } from '../data-table/data-table.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

export interface DataTableFiltro {
  nome: string;
  label: string;
  tipoDado: DataTableTipoDado;
  tipoFiltro: DataTableFiltroTipo;
}

export type DataTableFiltroTipo = 'igual' | 'intervalo' | 'maior' | 'menor';

export interface DataTableAction {
  label: string;
  icon: string;
  action: Function;
}

@Component({
  selector: 'data-table-filtros',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './data-table-filtros.component.html',
  styleUrl: './data-table-filtros.component.scss',
})
export class DataTableFiltrosComponent {
  formBuilder = inject(FormBuilder);

  @Output() filtroEmitter: EventEmitter<any> = new EventEmitter();

  @Input() set filtros(filtros: DataTableFiltro[]) {
    this._filtros = filtros;
    this.form = this.formBuilder.group({});

    for (const filtro of filtros) {
      //Filtro do tipo intervalo possui dois controles.
      if (filtro.tipoFiltro === 'intervalo') {
        this.form.addControl(`${filtro.nome}Min`, this.criarControl(filtro));
        this.form.addControl(`${filtro.nome}Max`, this.criarControl(filtro, true));
      } else {
        this.form.addControl(filtro.nome, this.criarControl(filtro));
      }
    }
  }

  get filtros(): DataTableFiltro[] {
    return this._filtros;
  }

  form: FormGroup;

  _filtros: DataTableFiltro[];

  emitFiltros() {
    this.filtroEmitter.emit(this.form.value);
  }

  private criarControl(filtro: DataTableFiltro, currencyMax?: boolean): FormControl {
    let control: FormControl;
    if (filtro.tipoDado === 'currency' || filtro.tipoDado === 'number') {
      if(!currencyMax) {
        control = new FormControl(0);
      } else {
        control = new FormControl(9999);
      }
    } else {
      control = new FormControl(null);
    }
    return control;
  }
}
