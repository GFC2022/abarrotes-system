import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../services/productos.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  standalone: true,  
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto: Producto = {
    id: 0,
    codigo_barra: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    fecha_caducidad: '',
    imagen: '',
    tienda_id: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductoById(id).subscribe({
      next: (data) => this.producto = data,
      error: () => alert('❌ No se pudo cargar el producto')
    });
  }

  eliminar(): void {
  if (confirm("⚠️ ¿Estás seguro de eliminar este producto?")) {
    this.productosService.eliminarProducto(this.producto.id).subscribe({
      next: () => {
        alert('✅ Producto eliminado');
        this.router.navigate(['/productos']);
      },
      error: () => alert('❌ Error al eliminar producto')
    });
  }
}

  guardar(): void {
    this.productosService.actualizarProducto(this.producto).subscribe({
      next: () => {
        alert('✅ Producto actualizado');
        this.router.navigate(['/productos']);
      },
      error: () => alert('❌ Error al actualizar producto')
    });
  }
}
