import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    this.mostrarAlerta('Su nombre es: ' + this.nombre + ' ' + this.apellido);
  }

}
