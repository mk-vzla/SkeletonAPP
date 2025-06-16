import { Component, OnInit } from '@angular/core';
import { DBTaskService } from '../../services/dbtask.service';

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
export class CertificacionesComponent implements OnInit {
  usuario: Usuario = new Usuario();
  today = new Date();
  nombreCertificado: string = '';
  fechaObtencion: Date | null = null;
  tieneVencimiento: boolean = false;
  fechaVencimiento: Date | null = null;

  certificaciones: any[] = []; // <-- Nuevo array para las certificaciones


  constructor(private dbTaskService: DBTaskService) { }

  ngOnInit(): void {
    const storedUsuario = localStorage.getItem('username');
    if (storedUsuario) {
      this.usuario.username = storedUsuario;
      this.cargarCertificaciones();
    }
  }

  async cargarCertificaciones() {
    this.certificaciones = await this.dbTaskService.obtenerCertificaciones(this.usuario.username);
  }

  async guardar() {
    if (!this.nombreCertificado || !this.fechaObtencion) {
      alert('Por favor, completa los campos requeridos.');
      return;
    }

    // Convierte fechas a string yyyy-mm-dd
    let fechaObtencionStr = '';
    let fechaVencimientoStr = '';

    if (this.fechaObtencion instanceof Date) {
      fechaObtencionStr = this.fechaObtencion.toISOString().split('T')[0];
    }

    if (this.tieneVencimiento && this.fechaVencimiento instanceof Date) {
      fechaVencimientoStr = this.fechaVencimiento.toISOString().split('T')[0];
    } else {
      fechaVencimientoStr = '';
    }

    try {
      this.nombreCertificado = this.nombreCertificado.toUpperCase();
      await this.dbTaskService.agregarrCertificacion(
        this.usuario.username,
        this.nombreCertificado,
        fechaObtencionStr,
        fechaVencimientoStr
      );
      //alert('Certificación guardada correctamente.');
      this.limpiar();
      await this.cargarCertificaciones(); // Recargar certificaciones después de guardar
    } catch (error) {
      //alert('Error al guardar la certificación.');
    }
  }

  limpiar() {
    this.nombreCertificado = '';
    this.fechaObtencion = null;
    this.tieneVencimiento = false;
    this.fechaVencimiento = null;
  }


  // eliminarCertificacion recibe nombre del certificado y utiliza el nombre de usuario del objeto cert
  async eliminarCertificacion(cert: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar la certificación "${cert.nombre_certificado}"?`)) {
      try {
        await this.dbTaskService.eliminarCertificacion(
          this.usuario.username,
          cert.nombre_certificado,
          cert.fecha_obtencion
        );
        await this.cargarCertificaciones();
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        alert('Error al eliminar la certificación: ' + errMsg);
      }
    }
  }

}
