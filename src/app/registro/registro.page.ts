import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DBTaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {

  username: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
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

  registrarse() {
    // Validar campos vacíos
    if (!this.username || !this.password || !this.repeatPassword) {
      this.mostrarAlerta('Por favor, completa todos los campos.');
      return;
    }
    // Validar username longitud máxima 8
    if (this.username.length <= 3 || this.username.length >= 9) {
      this.mostrarAlerta('El username debe tener entre 4 y 8 caracteres.');
      return;
    }
    // Validar password numérico de 4 dígitos
    if (!/^\d{4}$/.test(this.password)) {
      this.mostrarAlerta('La contraseña debe ser numérica de 4 dígitos.');
      this.password = '';
      this.repeatPassword = '';
      return;
    }
    // Validar que las contraseñas coincidan
    if (this.password !== this.repeatPassword) {
      this.mostrarAlerta('Las contraseñas no coinciden.');
      this.repeatPassword = '';
      return;
    }
    // Guardar Usuario en la BD
    try {
      this.dbTaskService.insertarUsuario(this.username, this.password, 0);
      this.router.navigate(['/login']);
    } catch (error) {
      this.mostrarAlerta('Error al registrar el usuario.');
    }
  }


  ngOnInit() {
  }

}
