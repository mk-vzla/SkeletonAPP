import { Component, OnInit } from '@angular/core';

// Clase Usuario
class Usuario {
  constructor(
    public username: string = ''
  ) { }
}

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  standalone: false
})
export class CertificacionesComponent  implements OnInit {
  usuario: Usuario = new Usuario();
  today = new Date();
  nombreCertificado: string = '';
  fechaObtencion: Date | null = null;
  tieneVencimiento: boolean = false;
  fechaVencimiento: Date | null = null;

  constructor() { }

  ngOnInit(): void {
    const storedUsuario = localStorage.getItem('username');
    if (storedUsuario) {
      this.usuario.username = storedUsuario;
    }
  }

  guardar() {
    // Aquí podrías agregar lógica para guardar la certificación
    // Por ejemplo, mostrar un alert o guardar en un array
    // ...implementación según necesidad...
  }

  limpiar() {
    this.nombreCertificado = '';
    this.fechaObtencion = null;
    this.tieneVencimiento = false;
    this.fechaVencimiento = null;
  }
}
