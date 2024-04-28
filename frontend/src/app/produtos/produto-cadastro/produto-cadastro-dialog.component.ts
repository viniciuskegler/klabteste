import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProdutosService } from '../produtos.service';
import { Produto } from '../produtos.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'produto-cadastro-dialog',
    templateUrl: 'produto-cadastro-dialog.component.html',
    styleUrl: 'produto-cadastro-dialog.component.scss'
})
export class ProdutoCadastroDialogComponent implements OnInit {
    snackBar: any = inject(MatSnackBar);
    data: any = inject(MAT_DIALOG_DATA);
    dialogRef: MatDialogRef<ProdutoCadastroDialogComponent> = inject(MatDialogRef<ProdutoCadastroDialogComponent>);
    formBuilder: FormBuilder = inject(FormBuilder);
    produtosService: ProdutosService = inject(ProdutosService);
    form: FormGroup;

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            nome: new FormControl("", [Validators.minLength(6), Validators.maxLength(256)]),
            quantidades: new FormControl(1, Validators.min(1)),
            defeitos: new FormControl(0, Validators.min(0)),
            preco: new FormControl(null)
        });
    }

    formatInput(event: any) {
        let valorTratado: number = Math.floor(event.target.value);
        event.target.value = valorTratado;
    }

    validarInputDefeitos(event: any) {
        let valor: number = event.target.value;
        if (valor > this.form.get('quantidades').value) {
            this.form.get('defeitos').setErrors({ max: true });
        }
    }

    cadastrar() {
        let produto: Produto = this.form.value;
        produto.preco = Number(produto.preco).toFixed(2);
        this.produtosService.createProduto(produto).subscribe({
            next: () => {
                this.snackBar.open("Produto cadastrado com sucesso!", null, { duration: 3000 })
                this.dialogRef.close({ sucess: true })
            },
            error: err => alert(err.error.message)
        })
    }
}