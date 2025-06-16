import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormatearFechaPipe } from '../../pipes/formatear-fecha.pipe';

// Clase Usuario 
class Usuario {
  constructor(
    public username: string = '',
    public email: string = '',
    public nombre: string = '',
    public apellido: string = '',
    public nivelEducacion: string = '',
    public fechaNacimiento: string = ''
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

  constructor(private alertController: AlertController) {
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

  ngOnInit() {}

  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alertController.create({
      header: this.usuario.email,
      message: mensaje,
      buttons: ['Yes']
    });
    await alerta.present();
  }

  mostrar() {
    if (!this.usuario.nombre || !this.usuario.apellido) {
      this.mostrarAlerta('Por favor, complete los campos de nombre y apellido.');
      return;
    }
    const nombreInitCap = this.usuario.nombre.charAt(0).toUpperCase() + this.usuario.nombre.slice(1).toLowerCase();
    const apellidoInitCap = this.usuario.apellido.charAt(0).toUpperCase() + this.usuario.apellido.slice(1).toLowerCase();
    const fechaFormateada = this.formatearFechaPipe.transform(this.usuario.fechaNacimiento);
    this.mostrarAlerta('Su nombre es: ' + nombreInitCap + ' ' + apellidoInitCap + ' ' + fechaFormateada);
  }

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
}
