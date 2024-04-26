import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  templateUrl: 'inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  httpClient = inject(HttpClient);
}
