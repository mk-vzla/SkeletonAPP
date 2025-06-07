import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nombre-compania',
  templateUrl: './nombre-compania.component.html',
  styleUrls: ['./nombre-compania.component.scss'],
  standalone: true
})
export class NombreCompaniaComponent {

  constructor() { }

  @Input() nombreCompania: string = 'Skeleton Company';

}
