import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VendasService } from '../../vendas/vendas.service';
import { CurrencyPipe } from '@angular/common';
import { Produto } from '../produtos.component';
import { Venda } from '../../vendas/vendas.component';


@Component({
    selector: 'produto-venda-dialog',
    templateUrl: 'produto-venda-dialog.component.html',
    styleUrls: ['produto-venda-dialog.component.scss', '../../app.component.scss']
})
export class ProdutoVendaDialogComponent implements OnInit {
    data: any = inject(MAT_DIALOG_DATA);
    dialogRef: MatDialogRef<ProdutoVendaDialogComponent> = inject(MatDialogRef<ProdutoVendaDialogComponent>);
    formBuilder: FormBuilder = inject(FormBuilder);
    vendasService: VendasService = inject(VendasService);
    currencyPipe: CurrencyPipe = inject(CurrencyPipe);
    form: FormGroup;
    produto: Produto;
    opcoesQtde: number[] = []


    ngOnInit(): void {
        this.produto = this.data.produto;
        this.form = this.formBuilder.group({
            comprador: new FormControl("", [Validators.minLength(1), Validators.maxLength(150)]),
            produtoId: new FormControl(this.data.produto.id),
            quantidades: new FormControl(1),
            totalVenda: new FormControl(0, Validators.min(0))
        });
        for (let i = 1; i < this.produto.disponivel + 1; i++) {
            this.opcoesQtde.push(i);
        }
        
        if(this.opcoesQtde.length === 0){
            this.form.get('quantidades').disable()
        }
    }

    efetuarVenda() {
        let venda: Venda = this.form.value;
        venda.totalVenda = (venda.quantidades * Number(this.produto.preco)).toFixed(2).toString();
        this.vendasService.createVenda(venda).subscribe({
            next: () => this.dialogRef.close({sucess: true}),
            error: err => alert(err.error.message)
        })
    }
}