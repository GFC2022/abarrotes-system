import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  codigo_barra: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  fecha_caducidad?: string;
  imagen?: string;
  tienda_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = '/api/productos'; // usa proxy.conf.json

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoByCodigo(codigo: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/by-barcode/${codigo}`);
  }

  // ✅ Buscar producto por ID
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // ✅ Actualizar producto
  actualizarProducto(producto: Producto): Observable<any> {
    return this.http.put(this.apiUrl, producto);
  }

  // ✅ Eliminar producto
eliminarProducto(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
  
}
