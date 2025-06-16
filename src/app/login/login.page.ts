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

  username: string = '';
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
    if (!this.username || !this.password) {
      this.mostrarAlerta('Por favor, completa todos los campos.');
      return;
    }

    if (this.username.length <= 3 || this.username.length >= 9) {
      this.mostrarAlerta('El username debe tener entre 4 y 8 caracteres.');
      return;
    }

    if (this.password.length != 4 || /^\d{4}$/.test(this.password) === false) {
      this.mostrarAlerta('La contraseña deben ser: 4 NÚMEROS.');
      this.password = '';
      return;
    }
    // Si las validaciones están bien, conectarse
    console.log('CONECTANDO:', this.username);
    localStorage.setItem('username', this.username);
    this.router.navigate(['/home'], { state: { email: this.username } });//.then(() => { location.reload(); });


  }

  noConectarseLogin() {
    console.log('NO CONECTANDO, MOSTRANDO EN CONSOLA');
  }

  ngOnInit() {
  }

}
