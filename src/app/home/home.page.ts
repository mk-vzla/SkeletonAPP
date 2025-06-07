import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { FormatearFechaPipe } from '../pipes/formatear-fecha.pipe';
import { MenuController } from '@ionic/angular';


// Clase Usuario (puedes moverla a un archivo aparte si prefieres)
class Usuario {
  constructor(
    public email: string = '',
    public nombre: string = '',
    public apellido: string = '',
    public nivelEducacion: string = '',
    public fechaNacimiento: string = ''
  ) { }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  today = new Date();

  usuario: Usuario = new Usuario();

  animarNombre = false;
  animarApellido = false;

  private formatearFechaPipe = new FormatearFechaPipe();

  constructor(private router: Router, private alertController: AlertController) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state && nav.extras.state['email']) {
      this.usuario.email = nav.extras.state['email'];
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
