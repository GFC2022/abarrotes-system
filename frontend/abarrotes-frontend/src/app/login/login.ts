import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  statusMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.http.get<any>('/api/status')
      .subscribe({
        next: (res) => this.statusMessage = res.message,
        error: (err) => {
          console.error(err);
          this.statusMessage = '❌ Error al conectar con backend';
        }
      });
  }
}
