import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { RouterModule } from '@angular/router';
import { ProdutosModule } from '../produtos/produtos.module';

const route = [{ path: '', component: InicioComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(route), ProdutosModule],
  declarations: [InicioComponent],
})
export class InicioModule {}
