import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  today = new Date();

  email: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: string = '';

  animarNombre = false;
  animarApellido = false;

  constructor(private router: Router, private alertController: AlertController) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state && nav.extras.state['email']) {
      this.email = nav.extras.state['email'];
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alertController.create({
      header: this.email,
      message: mensaje,
      buttons: ['Yes']
    });
    await alerta.present();
  }

  mostrar() {
    if (!this.nombre || !this.apellido) {
      this.mostrarAlerta('Por favor, complete los campos de nombre y apellido.');
      return;
    }
    const nombreInitCap = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1).toLowerCase();
    const apellidoInitCap = this.apellido.charAt(0).toUpperCase() + this.apellido.slice(1).toLowerCase();
    this.mostrarAlerta('Su nombre es: ' + nombreInitCap + ' ' + apellidoInitCap);
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';

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
