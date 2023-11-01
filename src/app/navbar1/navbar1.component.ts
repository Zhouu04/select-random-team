import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.css']
})
export class Navbar1Component {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;l

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
}
