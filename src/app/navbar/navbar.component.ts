import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    headerfull = false;
    marginHeader = '240px';

  toggleHeader() {
    this.headerfull = !this.headerfull;
    this.marginHeader = this.headerfull ? '0' : '240px';
  }
}
