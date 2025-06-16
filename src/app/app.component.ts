import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DBTaskService } from './services/dbtask.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private menu: MenuController, 
    private router: Router,
  private dbTaskService: DBTaskService) { }

  // cerrarMenu() {
  //   localStorage.removeItem('username');
  //   localStorage.removeItem('usuarioActivo'); // Limpiar el estado de conexión
  //   this.menu.close();
  //   this.router.navigate(['/login']).then(() => { location.reload(); });
  // }

  botonHome() {
    this.menu.close();
    this.router.navigate(['/home']);//.then(() => {location.reload();});
  }

  botonAcercaDe() {
    this.menu.close();
    this.router.navigate(['/acercade']);
  }

  botonContacto() {
    this.menu.close();
    //this.router.navigate(['/contacto']);
  }

  botonCerrarSesion(){
    this.menu.close();
    this.dbTaskService.cerrarSesion(localStorage.getItem('username') || '').then(() => {
      localStorage.removeItem('usuarioActivo'); // Limpiar el estado de conexión
      this.router.navigate(['/login']); //.then(() => { location.reload(); });
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}