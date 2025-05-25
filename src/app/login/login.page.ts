import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  public alertaConexion = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      handler: () => {
        this.noConectarseLogin();
        return true;
      }
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.conectarseLogin();
        return true;
      }
    },
  ];

  constructor() { }

  conectarseLogin() {
    console.log('CONECTANDO, MOSTRANDO EN CONSOLA');
  }
  noConectarseLogin() {
    console.log('NO CONECTANDO, MOSTRANDO EN CONSOLA');
  }

  ngOnInit() {
  }

}
