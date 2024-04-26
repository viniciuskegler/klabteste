import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpserviceModule } from './modules/httpservice.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpserviceModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Teste KLAB';
}
