import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DBTaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  sesionActiva: number = 0; // 0 = no conectado, 1 = conectado

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dbTaskService: DBTaskService
  ) { }

  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });
    await alerta.present();

  }


  async conectarseLogin() {
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

    // Validaciones pasadas, se puede proceder a conectarse
    localStorage.setItem('usuarioActivo', 'true'); // Guardar el estado de conexión

    // Si las validaciones están bien, conectarse
    console.log('CONECTANDO:', this.username);

    try {
      const usuario = await this.dbTaskService.validarUsuario(this.username, this.password);
      if (usuario) {
        this.sesionActiva = 1;
        await this.dbTaskService.actualizarEstadoSesion(this.username, this.sesionActiva);
        localStorage.setItem('usuarioActivo', 'true');
        localStorage.setItem('username', this.username);
        this.router.navigate(['/home'], { state: { email: this.username } });//.then(() => { location.reload(); });
        //this.mostrarAlerta('Usuario conectado correctamente.');
      } else {
        this.mostrarAlerta('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      const errorMsg = (error instanceof Error) ? error.message : String(error);
      this.mostrarAlerta('Error al conectarse. ' + errorMsg);
    }

  }

  noConectarseLogin() {
    console.log('NO CONECTANDO, MOSTRANDO EN CONSOLA');
  }

  ngOnInit() {
  }

}
