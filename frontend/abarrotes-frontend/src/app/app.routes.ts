import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';         // ajusta la ruta si tu componente login tiene otro path
import { ProductosComponent } from './productos/productos.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/editar/:id', component: EditarProductoComponent } // ✅ nueva ruta
];
