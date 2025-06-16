import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormatearFechaPipe } from '../../pipes/formatear-fecha.pipe';
import { DBTaskService } from '../../services/dbtask.service';

// Clase Usuario 
class Usuario {
  constructor(
    public username: string = '',
    public email: string = '',
    public nombre: string = '',
    public apellido: string = '',
    public nivelEducacion: string = '',
    public fechaNacimiento: Date | string | null = null
  ) { }
}

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  standalone: false
})
export class MisDatosComponent implements OnInit {
  today = new Date();
  usuario: Usuario = new Usuario();

  animarNombre = false;
  animarApellido = false;

  private formatearFechaPipe = new FormatearFechaPipe();

  constructor(private alertController: AlertController,
    private dbTaskService: DBTaskService
  ) {
    // Cargar username desde localStorage
    const usernameGuardado = localStorage.getItem('username');
    if (usernameGuardado) {
      this.usuario.username = usernameGuardado;
    }
    // Cargar email si está en localStorage (opcional)
    const emailGuardado = localStorage.getItem('email');
    if (emailGuardado) {
      this.usuario.email = emailGuardado;
    }
  }

  ngOnInit() {
    if (this.usuario.username) {
      this.dbTaskService.obtenerDatosUsuario(this.usuario.username).then(datos => {
        if (datos) {
          this.usuario.nombre = datos.nombre || '';
          this.usuario.apellido = datos.apellido || '';
          this.usuario.nivelEducacion = datos.nivel_educacion || '';
          // Convierte el string a Date si existe
          this.usuario.fechaNacimiento = datos.fecha_nacimiento
            ? new Date(datos.fecha_nacimiento)
            : null;
        }
      });
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alertController.create({
      header: this.usuario.email,
      message: mensaje,
      buttons: ['Yes']
    });
    await alerta.present();
  }

  // mostrar() {
  //   if (!this.usuario.nombre || !this.usuario.apellido) {
  //     this.mostrarAlerta('Por favor, complete los campos de nombre y apellido.');
  //     return;
  //   }
  //   const nombreInitCap = this.usuario.nombre.charAt(0).toUpperCase() + this.usuario.nombre.slice(1).toLowerCase();
  //   const apellidoInitCap = this.usuario.apellido.charAt(0).toUpperCase() + this.usuario.apellido.slice(1).toLowerCase();
  //   const fechaFormateada = this.formatearFechaPipe.transform(this.usuario.fechaNacimiento);
  //   this.mostrarAlerta('Su nombre es: ' + nombreInitCap + ' ' + apellidoInitCap + ' ' + fechaFormateada);
  // }

  limpiar() {
    this.usuario.nombre = '';
    this.usuario.apellido = '';

    // Activar animación
    this.animarNombre = true;
    this.animarApellido = true;

    // Quitar animación después de 1 segundo (duración del shake)
    setTimeout(() => {
      this.animarNombre = false;
      this.animarApellido = false;
    }, 1000);
  }

  async guardar() {
    if (!this.usuario.nombre) {
      this.mostrarAlerta('Por favor, complete el campo de nombre.');
      return;
    }

    if (this.usuario.nombre.length < 3) {
      this.mostrarAlerta('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    // GUARDAR TODO EN LA BASE DE DATOS
    try {
      // Convierte Date a string yyyy-mm-dd si es necesario
      let fechaNacimiento = this.usuario.fechaNacimiento;
      if (fechaNacimiento instanceof Date) {
        fechaNacimiento = fechaNacimiento.toISOString().split('T')[0];
      }
      // Transformar primera letra a mayúscula y el resto a minúscula
      const nombreInitCap = this.usuario.nombre.charAt(0).toUpperCase() + this.usuario.nombre.slice(1).toLowerCase();
      const apellidoInitCap = this.usuario.apellido ? this.usuario.apellido.charAt(0).toUpperCase() + this.usuario.apellido.slice(1).toLowerCase() : '';

      await this.dbTaskService.actualizarDatosUsuario(
        this.usuario.username,
        nombreInitCap,
        apellidoInitCap,
        this.usuario.nivelEducacion,
        fechaNacimiento || ''
      );
      //this.mostrarAlerta('Datos guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      this.mostrarAlerta('Error al guardar los datos. Por favor, inténtelo de nuevo más tarde.');
    }
  }
}
