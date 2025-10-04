import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService, Producto } from '../services/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  paginaActual = 1;
  productosPorPagina = 10;
  codigoBusqueda: string = '';
  errorMessage: string = '';
  productoSeleccionado: Producto | null = null;

  constructor(private productosService: ProductosService, private router: Router) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = '❌ Error al cargar productos';
      }
    });
  }

  filtrarProductos(): void {
    const term = this.codigoBusqueda.toLowerCase();
    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(term) ||
      p.codigo_barra.includes(term)
    );
    this.paginaActual = 1;
  }

  get productosPaginados(): Producto[] {
    const start = (this.paginaActual - 1) * this.productosPorPagina;
    return this.productosFiltrados.slice(start, start + this.productosPorPagina);
  }

  siguientePagina(): void {
    if (this.paginaActual * this.productosPorPagina < this.productosFiltrados.length) {
      this.paginaActual++;
    }
  }

  anteriorPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  get totalPaginas(): number {
    return Math.ceil(this.productosFiltrados.length / this.productosPorPagina);
  }

  verDetalles(producto: Producto): void {
    this.productoSeleccionado = producto;
  }

  cerrarModal(): void {
    this.productoSeleccionado = null;
  }

  // ✅ Navegación programática
  irAEditar(id?: number): void {
    if (id) {
      this.cerrarModal();
      this.router.navigate(['/productos/editar', id]);
    }
  }
}
