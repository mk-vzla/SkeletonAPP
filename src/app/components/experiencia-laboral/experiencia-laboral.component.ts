import { Component, OnInit } from '@angular/core';


// Clase Usuario
class Usuario {
  constructor(
    public username: string = ''
  ) { }
}

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
  standalone: false
})
export class ExperienciaLaboralComponent  implements OnInit {
  usuario: Usuario = new Usuario();
  empresa: string = '';
  anioInicio: number | null = null; // Cambiado de fechaInicio a anioInicio
  trabajaActualmente: boolean = true; // Cambiado a true por defecto
  anioTermino: number | null = null; // Cambiado de fechaTermino a anioTermino
  cargo: string = '';
  today = new Date();

  ngOnInit(): void {
    const storedUsuario = localStorage.getItem('username');
    if (storedUsuario) {
      this.usuario.username = storedUsuario;
    }
  }

  constructor() { }


}
