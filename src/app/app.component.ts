import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router) {}

  cerrarMenu() {
    localStorage.removeItem('username');
    localStorage.removeItem('usuarioActivo'); // Limpiar el estado de conexión
    this.menu.close();
    this.router.navigate(['/login']).then(() => {location.reload();});
  }

  botonHome(){
    this.menu.close();
    this.router.navigate(['/home']);//.then(() => {location.reload();});

  }
}