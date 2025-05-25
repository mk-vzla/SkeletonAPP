import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

    email: string = '';
    password: string = '';


  public alertaConexion = [
    {
      text: 'Nopiti',
      cssClass: 'alert-button-cancel',
      handler: () => {
        this.noConectarseLogin();
        return true;
      }
    },
    {
      text: 'Sipiti',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.conectarseLogin();
        return true;
      }
    },
  ];

  constructor() { }

  conectarseLogin() {
    console.log('CONECTANDO:', this.email);
  }
  noConectarseLogin() {
    console.log('NO CONECTANDO, MOSTRANDO EN CONSOLA');
  }

  ngOnInit() {
  }

}
