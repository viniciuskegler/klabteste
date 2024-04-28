import { Component, inject } from "@angular/core";
import { Produto } from "../produtos.component";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProdutosService } from "../produtos.service";

@Component({
  selector: "produto-atualizacao-dialog-component",
  templateUrl: "produto-atualizacao-dialog.component.html",
  styleUrl: "produto-atualizacao-dialog.component.scss"
})
export class ProdutoAtualizacaoDialogComponent {
  produtosService = inject(ProdutosService);
  data: any = inject(MAT_DIALOG_DATA);
  dialogRef: MatDialogRef<ProdutoAtualizacaoDialogComponent> = inject(MatDialogRef<ProdutoAtualizacaoDialogComponent>);
  formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  produto: Produto;

  ngOnInit() {
    this.produto = this.data.produto;
    this.form = this.formBuilder.group({
      qtdeDefeitos: new FormControl(this.produto.defeitos, [Validators.min(0), Validators.max(this.produto.quantidades)]),
      preco: new FormControl(Number(this.produto.preco).toFixed(2), Validators.min(Number(this.produto.preco)))
    });
  }

  atualizarProduto() {
    let produtoAtualizado = {
      defeitos: Math.floor(this.form.get('qtdeDefeitos').value),
      preco: Number(this.form.get('preco').value).toFixed(2)
    };
    this.produtosService.updateProductPriceDefects(this.produto.id, produtoAtualizado).subscribe({
      next: () => this.dialogRef.close({ sucess: true }),
      error: err => alert(err.error.message)
    })
  }

  formatInput(event:any) {
    let valorTratado: number = Math.floor(event.target.value);
    event.target.value = valorTratado;
    this.form.get('qtdeDefeitos').setValue(valorTratado);
  }

}