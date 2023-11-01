import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarHidden = false;
  sidebarWidth = '240px'; // Điều chỉnh độ rộng của sidebar tại đây

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
    this.sidebarWidth = this.isSidebarHidden ? '0' : '240px';
  }
}
