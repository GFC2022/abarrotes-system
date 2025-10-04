import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // 👈 aquí RouterLink
  template: `
    <div class="container mt-3">
      <h1 class="mb-4">Abarrotes Ángela</h1>
      <nav class="mb-3">
        <a routerLink="/login" class="btn btn-outline-primary me-2">Login</a>
        <a routerLink="/productos" class="btn btn-outline-success">Productos</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
