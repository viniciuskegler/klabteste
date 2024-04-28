import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpserviceModule } from './modules/httpservice.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,
    RouterOutlet, 
    HttpserviceModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router = inject(Router);
  title = 'Teste KLAB';

  navOpen: boolean = false;

  navigateHome() {
    this.router.navigateByUrl("/");
  }
}
