import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }

  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });
    await alerta.present();

  }


  conectarseLogin() {
    if (!this.email || !this.password) {
      this.mostrarAlerta('Por favor, completa todos los campos.');
      return;
    }

    if (this.email.length <= 3 || this.email.length >= 9) {
      this.mostrarAlerta('El email debe tener entre 4 y 8 caracteres.');
      return;
    }

    if (this.password.length != 4 || /^\d{4}$/.test(this.password) === false) {
      this.mostrarAlerta('La contraseña deben ser: 4 NÚMEROS.');
      this.password = '';
      return;
    }
    // Si las validaciones están bien, conectarse
    console.log('CONECTANDO:', this.email);
    this.router.navigate(['/home'], { state: { email: this.email } }).then(() => { location.reload(); });


  }

  noConectarseLogin() {
    console.log('NO CONECTANDO, MOSTRANDO EN CONSOLA');
  }

  ngOnInit() {
  }

}
