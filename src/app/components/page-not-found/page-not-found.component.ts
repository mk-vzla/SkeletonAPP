import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: false
})
export class PageNotFoundComponent  implements OnInit {

  constructor(private router: Router) { }

  irAHome() {
    this.router.navigate(['/home']);
  }
  ngOnInit() {}

}
